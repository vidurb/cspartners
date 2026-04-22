import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'teamMember',
	title: 'Team member',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'name', maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'role',
			title: 'Role',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'photo',
			title: 'Photo',
			type: 'image',
			options: { hotspot: true },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'profilePdf',
			title: 'Profile PDF URL',
			type: 'url',
		}),
		defineField({
			name: 'sortOrder',
			title: 'Sort order',
			type: 'number',
			description: 'Lower numbers appear first',
			validation: (Rule) => Rule.required().integer(),
		}),
	],
	preview: {
		select: { title: 'name', subtitle: 'role' },
		prepare({ title, subtitle }) {
			return { title, subtitle };
		},
	},
});
