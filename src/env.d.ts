/// <reference path="../.astro/types.d.ts" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
	readonly PUBLIC_SANITY_VISUAL_EDITING_ENABLED?: string;
	readonly SANITY_API_READ_TOKEN?: string;
	readonly CONTACT_EMAIL_TO?: string;
	readonly CONTACT_EMAIL_FROM?: string;
	readonly RESEND_API_KEY?: string;
}
