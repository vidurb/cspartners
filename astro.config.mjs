// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import sentry from '@sentry/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://cspartners.in',
	output: 'server',
	adapter: vercel({
		imageService: true,
	}),
	integrations: [
		sentry({
			org: process.env.SENTRY_ORG,
			project: process.env.SENTRY_PROJECT,
			authToken: process.env.SENTRY_AUTH_TOKEN,
			telemetry: false,
		}),
		sanity({
			projectId: 'u1i19rrb',
			dataset: 'production',
			useCdn: false,
			apiVersion: 'v2026-04-22',
			studioBasePath: '/admin',
			studioRouterHistory: 'hash',
			stega: {
				studioUrl: '/admin',
			},
		}),
		react(),
		mdx(),
		sitemap(),
	],
	vite: {
		// Expose Vercel-provided NEXT_PUBLIC_* to the client bundle (alongside Astro PUBLIC_*).
		envPrefix: ['PUBLIC_', 'NEXT_PUBLIC_'],
		plugins: [tailwindcss()],
	},
});
