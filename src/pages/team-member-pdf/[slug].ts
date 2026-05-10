import type { APIRoute } from 'astro';
import { attachmentContentDispositionPdf, partnerPdfBasename } from '../../lib/partnerPdfFilename';
import { loadQuery } from '../../lib/sanity/loadQuery';
import { teamMemberPdfBySlugQuery } from '../../lib/sanity/queries';

type PdfRow = {
	name: string;
	profilePdf: string | null;
} | null;

export const GET: APIRoute = async ({ params }) => {
	const slug = params.slug;
	if (!slug) {
		return new Response('Not found', { status: 404 });
	}

	const row = await loadQuery<PdfRow>(teamMemberPdfBySlugQuery, { slug });

	if (!row?.profilePdf) {
		return new Response('Not found', { status: 404 });
	}

	const upstream = await fetch(row.profilePdf);
	if (!upstream.ok || !upstream.body) {
		return new Response('Bad gateway', { status: 502 });
	}

	const basename = partnerPdfBasename(row.name);

	return new Response(upstream.body, {
		status: 200,
		headers: {
			'Content-Type': upstream.headers.get('Content-Type') ?? 'application/pdf',
			'Content-Disposition': attachmentContentDispositionPdf(basename),
		},
	});
};
