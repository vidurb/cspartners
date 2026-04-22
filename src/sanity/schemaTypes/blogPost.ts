import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'blogPost',
	title: 'Blog post',
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
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'updatedAt',
			title: 'Updated at',
			type: 'datetime',
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'string',
			initialValue: 'C&S Partners',
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [{ type: 'block' }],
		}),
	],
	preview: {
		select: { title: 'title', slug: 'slug.current' },
		prepare({ title, slug }) {
			return { title, subtitle: slug ? `/${slug}` : '' };
		},
	},
});
