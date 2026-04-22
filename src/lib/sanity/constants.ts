/** Public IDs for client + image URL builder (set in `.env` / Vercel). */
export const SANITY_PROJECT_ID =
	(typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) || 'u1i19rrb';
export const SANITY_DATASET =
	(typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET) || 'production';
