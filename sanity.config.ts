import { defineConfig } from 'sanity';
import { defineLocations, presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { deskStructure } from './src/sanity/deskStructure';
import { schemaTypes } from './src/sanity/schemaTypes';


const withHttps = (url: string) => (url.startsWith('http') ? url : `https://${url}`);

const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL
	? withHttps(process.env.SANITY_STUDIO_PREVIEW_URL)
	: 'https://cspartners.vercel.app';

const singletonLocation = (title: string, href: string) =>
	defineLocations({
		locations: [{ title, href }],
	});

export default defineConfig({
	name: 'default',
	title: 'C&S Partners',
	projectId: 'u1i19rrb',
	dataset: 'production',
	plugins: [
		presentationTool({
			previewUrl: {
				initial: previewUrl,
			},
			resolve: {
				locations: {
					siteSettings: defineLocations({
						message: 'Site settings are used across all pages.',
						tone: 'caution',
					}),
					disclaimerSettings: defineLocations({
						message: 'The disclaimer popup is used across all pages.',
						tone: 'caution',
					}),
					contactFormSettings: defineLocations({
						message: 'The contact form is used on multiple pages.',
						tone: 'caution',
					}),
					homePage: singletonLocation('Home', '/'),
					aboutPage: singletonLocation('About Us', '/about-us'),
					contactPage: singletonLocation('Contact Us & Careers', '/contact-career'),
					blogPost: defineLocations({
						select: { title: 'title', slug: 'slug.current' },
						resolve: (doc) => ({
							locations: doc?.slug
								? [
										{ title: doc.title || 'Untitled blog post', href: `/blog/${doc.slug}` },
										{ title: 'Blogs', href: '/blog' },
									]
								: [{ title: 'Blogs', href: '/blog' }],
						}),
					}),
					practiceArea: defineLocations({
						select: { title: 'title', slug: 'slug.current' },
						resolve: (doc) => ({
							locations: doc?.slug
								? [
										{ title: doc.title || 'Untitled practice area', href: `/practice-area/${doc.slug}` },
										{ title: 'Practice Areas', href: '/practice-area' },
									]
								: [{ title: 'Practice Areas', href: '/practice-area' }],
						}),
					}),
					teamMember: singletonLocation('Our Team', '/our-team'),
					jobPage: defineLocations({
						select: { title: 'title', slug: 'slug.current' },
						resolve: (doc) => ({
							locations: doc?.slug
								? [{ title: doc.title || 'Untitled job page', href: `/jobs/${doc.slug}` }]
								: [{ title: 'Contact Us & Careers', href: '/contact-career' }],
						}),
					}),
				},
			},
		}),
		structureTool({ structure: deskStructure }),
	],
	schema: {
		types: schemaTypes,
	},
});
