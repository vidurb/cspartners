const SLUG_DETAIL_RE = /^\/(blog|practice-area|jobs)\/[^/]+\/?$/;

/** Normalize webhook paths to match internal href conventions (trailing slash on slug detail routes). */
export function normalizePath(path: string): string {
	let p = path.trim();
	if (!p) return '/';
	if (!p.startsWith('/')) p = `/${p}`;
	if (SLUG_DETAIL_RE.test(p) && !p.endsWith('/')) {
		p = `${p}/`;
	}
	return p;
}

export function normalizePaths(paths: string[]): string[] {
	return [...new Set(paths.map(normalizePath))];
}
