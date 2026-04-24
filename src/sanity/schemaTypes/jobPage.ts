import { defineArrayMember, defineField, defineType } from 'sanity';

const jobPortableText = defineArrayMember({
	type: 'block',
	marks: {
		decorators: [
			{ title: 'Strong', value: 'strong' },
			{ title: 'Emphasis', value: 'em' },
		],
		annotations: [
			{
				name: 'link',
				type: 'object',
				title: 'Link',
				fields: [
					defineField({
						name: 'href',
						title: 'URL',
						type: 'string',
						description: 'Absolute URL, mailto:, or path (e.g. /contact-career)',
						validation: (Rule) => Rule.required(),
					}),
				],
			},
		],
	},
});

export default defineType({
	name: 'jobPage',
	title: 'Job / careers page',
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
			title: 'Meta description',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'published',
			title: 'Published',
			type: 'boolean',
			initialValue: true,
		}),
		defineField({
			name: 'sortOrder',
			title: 'Sort order',
			type: 'number',
			description: 'Lower numbers first in listings',
			initialValue: 0,
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [jobPortableText],
		}),
		defineField({
			name: 'howToApplyHeading',
			title: '“How to apply” heading',
			type: 'string',
			initialValue: 'How to apply',
		}),
		defineField({
			name: 'howToApplyBody',
			title: '“How to apply” body',
			type: 'array',
			of: [jobPortableText],
		}),
	],
	preview: {
		select: { title: 'title', slug: 'slug.current', published: 'published' },
		prepare({ title, slug, published }) {
			return {
				title,
				subtitle: [slug ? `/jobs/${slug}` : '', published === false ? '(draft)' : ''].filter(Boolean).join(' '),
			};
		},
	},
});
