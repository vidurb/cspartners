/// <reference path="../.astro/types.d.ts" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
	readonly PUBLIC_SANITY_VISUAL_EDITING_ENABLED?: string;
	readonly NEXT_PUBLIC_SENTRY_DSN?: string;
	readonly PUBLIC_SENTRY_DSN?: string;
	readonly SANITY_API_READ_TOKEN?: string;
	readonly CONTACT_EMAIL_TO?: string;
	readonly CONTACT_EMAIL_FROM?: string;
	readonly RESEND_API_KEY?: string;
}

declare namespace NodeJS {
	interface ProcessEnv {
		readonly SENTRY_AUTH_TOKEN?: string;
		readonly SENTRY_ORG?: string;
		readonly SENTRY_PROJECT?: string;
		readonly NEXT_PUBLIC_SENTRY_DSN?: string;
		readonly SENTRY_DSN?: string;
		readonly VERCEL_ENV?: string;
		readonly VERCEL_GIT_COMMIT_SHA?: string;
	}
}
