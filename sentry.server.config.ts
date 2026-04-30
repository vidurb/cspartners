import * as Sentry from '@sentry/astro';

const dsn =
	process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN;

const vercelEnv = process.env.VERCEL_ENV;
const isProduction = vercelEnv === 'production';

Sentry.init({
	dsn: dsn || undefined,
	environment: vercelEnv ?? process.env.NODE_ENV ?? 'development',
	release: process.env.VERCEL_GIT_COMMIT_SHA,
	sendDefaultPii: false,
	tracesSampleRate: isProduction ? 0.2 : 1.0,
});
