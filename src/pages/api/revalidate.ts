import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import type { APIRoute } from 'astro';
import { CONTENT_LAKE_DELAY_MS, getRevalidateConfig } from '../../lib/revalidate/config';
import { normalizePaths } from '../../lib/revalidate/normalizePaths';
import { purgePath } from '../../lib/revalidate/purgePath';
import type { RevalidateResult, SanityRevalidatePayload } from '../../lib/revalidate/types';

export const POST: APIRoute = async ({ request }) => {
	const config = getRevalidateConfig();
	if ('error' in config) {
		return new Response(JSON.stringify({ message: config.error }), {
			status: config.status,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const body = await request.text();
	const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? '';

	if (!(await isValidSignature(body, signature, config.secret))) {
		return new Response(JSON.stringify({ message: 'Invalid signature' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let payload: SanityRevalidatePayload;
	try {
		payload = JSON.parse(body) as SanityRevalidatePayload;
	} catch {
		return new Response(JSON.stringify({ message: 'Invalid JSON body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const rawPaths = payload.paths;
	if (!Array.isArray(rawPaths) || rawPaths.length === 0) {
		return new Response(JSON.stringify({ message: 'Missing or empty paths', body: payload }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	await new Promise((resolve) => setTimeout(resolve, CONTENT_LAKE_DELAY_MS));

	const paths = normalizePaths(rawPaths.filter((p): p is string => typeof p === 'string'));
	const result: RevalidateResult = { revalidated: [], failed: [] };

	for (const path of paths) {
		try {
			await purgePath(config.siteUrl, path, config.bypassToken);
			result.revalidated.push(path);
		} catch (err) {
			result.failed.push({
				path,
				error: err instanceof Error ? err.message : 'Unknown error',
			});
		}
	}

	const status = result.failed.length > 0 && result.revalidated.length === 0 ? 500 : 200;

	return new Response(JSON.stringify(result), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
};

export const GET: APIRoute = () =>
	new Response(JSON.stringify({ message: 'Method not allowed' }), {
		status: 405,
		headers: { 'Content-Type': 'application/json' },
	});
