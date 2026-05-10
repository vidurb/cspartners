import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'homePage',
	title: 'Home page',
	type: 'document',
	fields: [
		defineField({ name: 'heroTitle', title: 'Hero title', type: 'string' }),
		defineField({ name: 'heroSubtitle', title: 'Hero subtitle', type: 'text', rows: 4 }),
		defineField({ name: 'heroCtaLabel', title: 'Hero CTA label', type: 'string' }),
		defineField({ name: 'heroCtaHref', title: 'Hero CTA link', type: 'string' }),
		defineField({ name: 'founderHeading', title: 'Founder section heading', type: 'string' }),
		defineField({
			name: 'founderBody',
			title: 'Founder section body',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({ name: 'founderSignature', title: 'Founder signature line', type: 'string' }),
		defineField({ name: 'founderCtaLabel', title: 'Founder “know more” label', type: 'string' }),
		defineField({ name: 'founderCtaHref', title: 'Founder “know more” link', type: 'string' }),
		defineField({
			name: 'founderImage',
			title: 'Founder section image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'awardLogos',
			title: 'Awards & recognitions logos',
			description: 'Shown on the homepage carousel; order matches display left-to-right.',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'awardLogo',
					title: 'Award logo',
					fields: [
						defineField({
							name: 'image',
							title: 'Logo image',
							type: 'image',
							options: { hotspot: true },
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'alt',
							title: 'Alt text',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
					],
					preview: {
						select: { alt: 'alt' },
						prepare({ alt }: { alt?: string }) {
							return { title: alt || 'Award logo' };
						},
					},
				},
			],
		}),
		defineField({ name: 'practiceAreasHeading', title: 'Practice areas heading', type: 'string' }),
		defineField({ name: 'practiceAreasIntro', title: 'Practice areas intro', type: 'text', rows: 3 }),
		defineField({ name: 'practiceAreasViewAllLabel', title: 'Practice areas “view all” label', type: 'string' }),
		defineField({ name: 'teamHeading', title: 'Team section heading', type: 'string' }),
		defineField({ name: 'teamMeetFullLabel', title: 'Team “meet full team” label', type: 'string' }),
		defineField({ name: 'blogsHeading', title: 'Blogs section heading', type: 'string' }),
		defineField({ name: 'blogsAllArticlesLabel', title: 'Blogs “all articles” label', type: 'string' }),
		defineField({ name: 'contactSectionHeading', title: 'Contact section heading', type: 'string' }),
	],
	preview: {
		prepare() {
			return { title: 'Home page' };
		},
	},
});
