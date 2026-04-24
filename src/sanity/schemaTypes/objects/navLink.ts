import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'navLink',
	title: 'Navigation link',
	type: 'object',
	fields: [
		defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
		defineField({ name: 'href', title: 'Path', type: 'string', description: 'e.g. /about-us', validation: (Rule) => Rule.required() }),
	],
	preview: {
		select: { title: 'label', subtitle: 'href' },
	},
});
