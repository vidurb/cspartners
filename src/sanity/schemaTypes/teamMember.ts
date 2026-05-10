import { defineField, defineType } from 'sanity';

const ROLE_OPTIONS = [
	{ title: 'Associate', value: 'Associate' },
	{ title: 'Senior Associate', value: 'Senior Associate' },
	{ title: 'Managing Associate', value: 'Managing Associate' },
	{ title: 'Partner', value: 'Partner' },
	{ title: 'Of-Counsel', value: 'Of-Counsel' },
	{ title: 'Promoter-Partner', value: 'Promoter-Partner' },
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
			name: 'listingOrder',
			title: 'Listing order',
			type: 'number',
			description: 'Lower numbers appear first on Our Team (seniority). Leave empty to sort by role only.',
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
			title: 'Profile PDF',
			type: 'file',
			options: {
				accept: 'application/pdf',
			},
		}),
	],
	preview: {
		select: { title: 'name', subtitle: 'role' },
		prepare({ title, subtitle }) {
			return { title, subtitle };
		},
	},
});
