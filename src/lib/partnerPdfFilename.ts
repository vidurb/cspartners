/**
 * Build a download filename base from a partner display name (no extension).
 * Strips characters that are invalid in common filesystems.
 */
export function partnerPdfBasename(displayName: string): string {
	const trimmed = displayName.trim();
	const withoutIllegal = trimmed
		.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '')
		.replace(/\s+/g, ' ')
		.trimEnd()
		.replace(/^\.+/, '');
	return withoutIllegal.length > 0 ? withoutIllegal : 'profile';
}

/** `Content-Disposition: attachment` for a single PDF, with UTF-8 `filename*`. */
export function attachmentContentDispositionPdf(basename: string): string {
	const filename = `${basename}.pdf`;
	const asciiFallback = filename
		.replace(/[^\x20-\x7E]/g, '_')
		.replace(/["\\]/g, '_');
	return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}
