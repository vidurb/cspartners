const REVALIDATE_HEADER = 'x-prerender-revalidate';

export async function purgePath(
	siteUrl: string,
	path: string,
	bypassToken: string,
): Promise<void> {
	const url = new URL(path, siteUrl);
	const response = await fetch(url, {
		method: 'HEAD',
		headers: { [REVALIDATE_HEADER]: bypassToken },
	});

	if (!response.ok) {
		throw new Error(`HEAD ${url.pathname} returned ${response.status}`);
	}
}
