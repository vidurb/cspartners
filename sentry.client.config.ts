import * as Sentry from '@sentry/astro';

/** Vercel Sentry integration exposes DSN as NEXT_PUBLIC_SENTRY_DSN; allow Astro-style PUBLIC_SENTRY_DSN as fallback */
const dsn =
	import.meta.env.NEXT_PUBLIC_SENTRY_DSN ??
	import.meta.env.PUBLIC_SENTRY_DSN;

const isProduction = import.meta.env.PROD;

Sentry.init({
	dsn: dsn || undefined,
	environment: import.meta.env.MODE,
	sendDefaultPii: false,
	integrations: [Sentry.browserTracingIntegration()],
	tracesSampleRate: isProduction ? 0.1 : 1.0,
});
