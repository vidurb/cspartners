import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'disclaimerSettings',
	title: 'Disclaimer popup',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Title', type: 'string' }),
		defineField({
			name: 'bullets',
			title: 'Bullet points',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'disclaimerBullet',
					fields: [
						defineField({
							name: 'text',
							title: 'Text',
							type: 'text',
							rows: 4,
							validation: (Rule) => Rule.required(),
						}),
					],
					preview: {
						select: { title: 'text' },
						prepare({ title }) {
							return { title: title?.slice(0, 80) ?? 'Bullet' };
						},
					},
				},
			],
		}),
		defineField({ name: 'acceptButtonLabel', title: 'Accept button label', type: 'string' }),
	],
	preview: {
		prepare() {
			return { title: 'Disclaimer popup' };
		},
	},
});
