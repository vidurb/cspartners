/// <reference path="../.astro/types.d.ts" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
	readonly CONTACT_EMAIL_TO?: string;
	readonly CONTACT_EMAIL_FROM?: string;
	readonly RESEND_API_KEY?: string;
}
