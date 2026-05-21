export function getRevalidateConfig(): {
	secret: string;
	bypassToken: string;
	siteUrl: string;
} | { error: string; status: number } {
	const secret = process.env.SANITY_REVALIDATE_SECRET;
	const bypassToken = process.env.VERCEL_ISR_BYPASS_TOKEN;
	const siteUrl = process.env.REVALIDATE_SITE_URL ?? 'https://cspartners.in';

	if (!secret) {
		return { error: 'Missing SANITY_REVALIDATE_SECRET', status: 500 };
	}
	if (!bypassToken) {
		return { error: 'Missing VERCEL_ISR_BYPASS_TOKEN', status: 500 };
	}

	return { secret, bypassToken, siteUrl: siteUrl.replace(/\/$/, '') };
}

/** Brief delay so Content Lake changes are visible before ISR regeneration. */
export const CONTENT_LAKE_DELAY_MS = 1000;
