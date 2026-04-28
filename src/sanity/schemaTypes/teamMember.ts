import { defineField, defineType } from 'sanity';

const ROLE_OPTIONS = [
	{ title: 'Associate', value: 'Associate' },
	{ title: 'Senior Associate', value: 'Senior Associate' },
	{ title: 'Managing Associate', value: 'Managing Associate' },
	{ title: 'Partner', value: 'Partner' },
	{ title: 'Of-Counsel', value: 'Of-Counsel' },
	{ title: 'Senior Partner', value: 'Senior Partner' },
] as const;

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
			options: {
				list: [...ROLE_OPTIONS],
				layout: 'dropdown',
			},
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
	],
	preview: {
		select: { title: 'name', subtitle: 'role' },
		prepare({ title, subtitle }) {
			return { title, subtitle };
		},
	},
});
