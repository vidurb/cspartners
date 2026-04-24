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
