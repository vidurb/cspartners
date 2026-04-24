import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'contactPage',
	title: 'Contact & careers page',
	type: 'document',
	fields: [
		defineField({ name: 'heroTitle', title: 'Hero title', type: 'string' }),
		defineField({ name: 'heroSubtitle', title: 'Hero subtitle', type: 'string' }),
		defineField({ name: 'emailSectionHeading', title: 'Email block heading', type: 'string' }),
		defineField({ name: 'contactFormSectionHeading', title: 'Contact form section heading', type: 'string' }),
		defineField({ name: 'internshipsHeading', title: 'Internships section heading', type: 'string' }),
		defineField({ name: 'internshipsBody', title: 'Internships body', type: 'text', rows: 5 }),
		defineField({ name: 'internshipsCtaLabel', title: 'Internships CTA label', type: 'string' }),
		defineField({ name: 'internshipsCtaHref', title: 'Internships CTA link', type: 'string' }),
	],
	preview: {
		prepare() {
			return { title: 'Contact & careers' };
		},
	},
});
