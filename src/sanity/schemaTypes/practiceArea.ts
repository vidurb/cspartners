import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'practiceArea',
	title: 'Practice area',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'order',
			title: 'Display order',
			type: 'number',
			validation: (Rule) => Rule.required().integer(),
		}),
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'image',
			options: { hotspot: true },
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
		select: { title: 'title', order: 'order' },
		prepare({ title, order }) {
			return { title, subtitle: order != null ? `Order: ${order}` : '' };
		},
	},
});
