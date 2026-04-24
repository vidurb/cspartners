import { createClient } from '@sanity/client';
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { blogPostsListQuery, siteSettingsCompactQuery } from '../lib/sanity/queries';
import type { SiteSettingsDoc } from '../lib/sanity/types';
import { mergeSiteSettings } from '../lib/sanity/mergeContent';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'u1i19rrb';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';

export const GET: APIRoute = async (context) => {
	const client = createClient({
		projectId,
		dataset,
		apiVersion: 'v2026-04-22',
		useCdn: true,
	});

	const [posts, siteRaw] = await Promise.all([
		client.fetch<
			{
				title: string;
				slug: string;
				description: string;
				publishedAt: string;
			}[]
		>(blogPostsListQuery),
		client.fetch<Partial<SiteSettingsDoc> | null>(siteSettingsCompactQuery),
	]);

	const site = mergeSiteSettings(siteRaw);
	const sorted = [...posts].sort((a, b) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf());

	return rss({
		title: site.siteTitle,
		description: site.siteDescription ?? '',
		site: context.site ?? 'https://cspartners.in',
		items: sorted.map((post) => ({
			title: post.title,
			pubDate: new Date(post.publishedAt),
			description: post.description,
			link: `/blog/${post.slug}/`,
		})),
	});
};
