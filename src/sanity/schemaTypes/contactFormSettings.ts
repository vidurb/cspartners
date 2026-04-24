import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'contactFormSettings',
	title: 'Contact form',
	type: 'document',
	fields: [
		defineField({ name: 'intro', title: 'Intro paragraph', type: 'text', rows: 4 }),
		defineField({ name: 'nameLabel', title: 'Name label', type: 'string' }),
		defineField({ name: 'namePlaceholder', title: 'Name placeholder', type: 'string' }),
		defineField({ name: 'mobileLabel', title: 'Mobile label', type: 'string' }),
		defineField({ name: 'mobilePlaceholder', title: 'Mobile placeholder', type: 'string' }),
		defineField({ name: 'emailLabel', title: 'Email label', type: 'string' }),
		defineField({ name: 'emailPlaceholder', title: 'Email placeholder', type: 'string' }),
		defineField({ name: 'messageLabel', title: 'Message label', type: 'string' }),
		defineField({ name: 'messagePlaceholder', title: 'Message placeholder', type: 'string' }),
		defineField({ name: 'submitLabel', title: 'Submit button label', type: 'string' }),
		defineField({ name: 'footnote', title: 'Footnote under submit', type: 'text', rows: 2 }),
	],
	preview: {
		prepare() {
			return { title: 'Contact form' };
		},
	},
});
