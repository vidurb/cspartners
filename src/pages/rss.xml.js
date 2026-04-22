import { createClient } from '@sanity/client';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

const blogPostsListQuery = `
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    description,
    publishedAt
  }
`;

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'u1i19rrb';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';

export async function GET(context) {
	const client = createClient({
		projectId,
		dataset,
		apiVersion: 'v2026-04-22',
		useCdn: true,
	});

	const posts = await client.fetch(blogPostsListQuery);
	const sorted = [...posts].sort((a, b) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: sorted.map((post) => ({
			title: post.title,
			pubDate: new Date(post.publishedAt),
			description: post.description,
			link: `/blog/${post.slug}/`,
		})),
	});
}
