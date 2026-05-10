import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'aboutPage',
	title: 'About page',
	type: 'document',
	fields: [
		defineField({
			name: 'sections',
			title: 'Sections',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'aboutSection',
					title: 'Section',
					fields: [
						defineField({
							name: 'heading',
							title: 'Heading',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'body',
							title: 'Body',
							type: 'array',
							of: [{ type: 'block' }],
						}),
					],
					preview: {
						select: { title: 'heading' },
						prepare({ title }) {
							return { title: title || 'Section' };
						},
					},
				},
			],
		}),
		defineField({
			name: 'founderPortraits',
			title: 'Founder portraits',
			description: 'Three photos above the copy; order is left-to-right in the grid.',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'founderPortrait',
					title: 'Founder portrait',
					fields: [
						defineField({
							name: 'image',
							title: 'Portrait',
							type: 'image',
							options: { hotspot: true },
							validation: (Rule) => Rule.required(),
						}),
						defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
					],
					preview: {
						select: { alt: 'alt' },
						prepare({ alt }: { alt?: string }) {
							return { title: alt || 'Founder portrait' };
						},
					},
				},
			],
		}),
		defineField({ name: 'practiceAreasCtaLabel', title: 'Practice areas CTA label', type: 'string' }),
		defineField({ name: 'practiceAreasCtaHref', title: 'Practice areas CTA link', type: 'string' }),
		defineField({ name: 'contactSectionHeading', title: 'Contact section heading', type: 'string' }),
	],
	preview: {
		prepare() {
			return { title: 'About page' };
		},
	},
});
