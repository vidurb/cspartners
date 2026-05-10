/**
 * Fetches legacy WordPress media, uploads to Sanity, and sets `homePage.awardLogos` + `aboutPage.founderPortraits`.
 * Requires `SANITY_API_TOKEN` or `SANITY_API_WRITE_TOKEN` with write access (Content Lake). Do not commit the token.
 *
 *   pnpm sanity:migrate-wp-images
 */
import { createHash } from 'node:crypto';
import { createClient, type SanityClient } from '@sanity/client';

const projectId = 'u1i19rrb';
const dataset = 'production';
const base = 'https://cspartners.in/wp-content/uploads';

function stableKey(seed: string): string {
	return createHash('sha256').update(seed).digest('hex').slice(0, 12);
}

async function fetchFirstBuffer(urls: string[]): Promise<{ buffer: Buffer; filename: string }> {
	for (const url of urls) {
		const res = await fetch(url);
		if (!res.ok) continue;
		const buffer = Buffer.from(await res.arrayBuffer());
		const pathname = new URL(url).pathname.split('/').pop() || 'image.bin';
		return { buffer, filename: pathname };
	}
	throw new Error(`Failed to fetch any of: ${urls.join(', ')}`);
}

async function uploadImage(client: SanityClient, urls: string[]): Promise<string> {
	const { buffer, filename } = await fetchFirstBuffer(urls);
	const asset = await client.assets.upload('image', buffer, { filename });
	return asset._id;
}

const awardDefs = [
	{
		candidates: [`${base}/2026/03/Untitled-1080-x-1080-px.png`, `${base}/2026/03/Untitled-1080-x-1080-px-150x150.png`],
		alt: 'C&S Partners award recognition',
	},
	{
		candidates: [`${base}/2026/03/1-1.png`, `${base}/2026/03/1-1-150x150.png`],
		alt: 'C&S Partners award recognition',
	},
	{
		candidates: [`${base}/2026/03/3-2.png`, `${base}/2026/03/3-2-150x150.png`],
		alt: 'C&S Partners award recognition',
	},
	{
		candidates: [`${base}/2026/03/2-1.png`, `${base}/2026/03/2-1-150x150.png`],
		alt: 'C&S Partners award recognition',
	},
	{
		candidates: [`${base}/2026/03/1-3.png`, `${base}/2026/03/1-3-150x150.png`],
		alt: 'C&S Partners award recognition',
	},
	{
		candidates: [`${base}/2026/03/3-1.png`, `${base}/2026/03/3-1-150x150.png`],
		alt: 'C&S Partners award recognition',
	},
	{
		candidates: [
			`${base}/2026/03/benchmark-litigation-1024x576-1.jpg`,
			`${base}/2026/03/benchmark-litigation-1024x576-1-150x150.jpg`,
		],
		alt: 'Benchmark Litigation award recognition for C&S Partners',
	},
];

const founderDefs = [
	{
		candidates: [`${base}/2026/02/51-image-2048x1365.jpg`, `${base}/2026/02/51-image-1024x683.jpg`],
		alt: 'C&S Partners founder portrait',
	},
	{
		candidates: [`${base}/2026/03/9B1A8854-2048x1365.jpg`, `${base}/2026/03/9B1A8854-1024x683.jpg`],
		alt: 'C&S Partners founder portrait',
	},
	{
		candidates: [`${base}/2026/03/9B1A8893-2048x1365.jpg`, `${base}/2026/03/9B1A8893-1024x683.jpg`],
		alt: 'C&S Partners founder portrait',
	},
];

async function main() {
	const token = process.env.SANITY_API_TOKEN ?? process.env.SANITY_API_WRITE_TOKEN;
	if (!token?.trim()) {
		throw new Error(
			'Set SANITY_API_TOKEN or SANITY_API_WRITE_TOKEN to a token with write access (project Settings → API → Tokens).',
		);
	}

	const client = createClient({
		projectId,
		dataset,
		apiVersion: '2025-05-01',
		token,
		useCdn: false,
	});

	const awardLogos = [];
	for (let i = 0; i < awardDefs.length; i++) {
		const def = awardDefs[i];
		const ref = await uploadImage(client, def.candidates);
		awardLogos.push({
			_type: 'awardLogo',
			_key: stableKey(`award-${i}-${def.candidates[0]}`),
			alt: def.alt,
			image: { _type: 'image', asset: { _type: 'reference', _ref: ref } },
		});
		console.info(`Uploaded award ${i + 1}/${awardDefs.length}`);
	}

	const founderPortraits = [];
	for (let i = 0; i < founderDefs.length; i++) {
		const def = founderDefs[i];
		const ref = await uploadImage(client, def.candidates);
		founderPortraits.push({
			_type: 'founderPortrait',
			_key: stableKey(`founder-${i}-${def.candidates[0]}`),
			alt: def.alt,
			image: { _type: 'image', asset: { _type: 'reference', _ref: ref } },
		});
		console.info(`Uploaded founder portrait ${i + 1}/${founderDefs.length}`);
	}

	await client.patch('homePage').set({ awardLogos }).commit();
	await client.patch('aboutPage').set({ founderPortraits }).commit();

	console.info('Patched homePage.awardLogos and aboutPage.founderPortraits.');
}

main().catch((err: unknown) => {
	console.error(err);
	process.exit(1);
});
