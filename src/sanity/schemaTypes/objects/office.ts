import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'office',
	title: 'Office',
	type: 'object',
	fields: [
		defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
		defineField({ name: 'street', title: 'Street', type: 'string', validation: (Rule) => Rule.required() }),
		defineField({ name: 'city', title: 'City / postal', type: 'string', validation: (Rule) => Rule.required() }),
		defineField({ name: 'phone', title: 'Phone', type: 'string', validation: (Rule) => Rule.required() }),
		defineField({
			name: 'mapEmbedUrl',
			title: 'Google Maps embed URL',
			type: 'url',
			description: 'Use the embed src URL (maps?q=…&output=embed)',
		}),
		defineField({ name: 'mapIframeTitle', title: 'Map iframe title (accessibility)', type: 'string' }),
	],
	preview: {
		select: { title: 'label', subtitle: 'city' },
	},
});
