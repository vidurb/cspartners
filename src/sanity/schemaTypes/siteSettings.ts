import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'siteSettings',
	title: 'Site settings',
	type: 'document',
	fields: [
		defineField({
			name: 'siteTitle',
			title: 'Site title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'siteDescription',
			title: 'Default meta description',
			type: 'text',
			rows: 4,
		}),
		defineField({
			name: 'navLinks',
			title: 'Primary navigation',
			type: 'array',
			of: [{ type: 'navLink' }],
			validation: (Rule) => Rule.min(1),
		}),
		defineField({
			name: 'contactEmail',
			title: 'Contact email',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'offices',
			title: 'Offices',
			type: 'array',
			of: [{ type: 'office' }],
		}),
		defineField({
			name: 'footerTagline',
			title: 'Footer tagline',
			type: 'string',
			description: 'Shown under the logo in the footer',
		}),
		defineField({ name: 'footerNavigateHeading', title: 'Footer “Navigate” heading', type: 'string' }),
		defineField({ name: 'footerOfficesHeading', title: 'Footer “Offices” heading', type: 'string' }),
		defineField({ name: 'footerContactHeading', title: 'Footer “Contact” heading', type: 'string' }),
		defineField({
			name: 'headerHomeAriaLabel',
			title: 'Header home link aria-label',
			type: 'string',
		}),
		defineField({
			name: 'mobileMenuHomeLabel',
			title: 'Mobile menu home row label',
			type: 'string',
		}),
		defineField({
			name: 'blogAuthorFallback',
			title: 'Fallback blog author name',
			type: 'string',
			description: 'Used when a post has no author',
		}),
		defineField({
			name: 'blogReadMoreLabel',
			title: 'Blog card “Read more” label',
			type: 'string',
		}),
		defineField({
			name: 'practiceAreaCtaLabel',
			title: 'Practice area sidebar CTA label',
			type: 'string',
		}),
	],
	preview: {
		prepare() {
			return { title: 'Site settings' };
		},
	},
});
