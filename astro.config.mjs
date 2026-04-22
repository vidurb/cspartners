// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://cspartners.in',
	output: 'static',
	adapter: vercel({
		imageService: true,
	}),
	integrations: [
		sanity({
			projectId: 'u1i19rrb',
			dataset: 'production',
			useCdn: false,
			apiVersion: 'v2026-04-22',
			studioBasePath: '/admin',
			studioRouterHistory: 'hash',
		}),
		react(),
		mdx(),
		sitemap(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
