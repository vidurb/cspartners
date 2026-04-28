import type { StructureResolver } from 'sanity/structure';

/** Fixed `_id` for singleton documents (create via Studio or seed script). */
const SINGLETONS: { schemaType: string; documentId: string; title: string }[] = [
	{ schemaType: 'siteSettings', documentId: 'siteSettings', title: 'Site settings' },
	{ schemaType: 'homePage', documentId: 'homePage', title: 'Home page' },
	{ schemaType: 'aboutPage', documentId: 'aboutPage', title: 'About page' },
	{ schemaType: 'contactPage', documentId: 'contactPage', title: 'Contact & careers page' },
	{ schemaType: 'disclaimerSettings', documentId: 'disclaimerSettings', title: 'Disclaimer popup' },
	{ schemaType: 'contactFormSettings', documentId: 'contactFormSettings', title: 'Contact form' },
];

function singletonListItem(
	S: Parameters<StructureResolver>[0],
	config: (typeof SINGLETONS)[number],
) {
	return S.listItem()
		.title(config.title)
		.id(config.documentId)
		.child(
			S.document().schemaType(config.schemaType).documentId(config.documentId).title(config.title),
		);
}

export const deskStructure: StructureResolver = (S) =>
	S.list()
		.title('C&S Partners')
		.items([
			...SINGLETONS.map((c) => singletonListItem(S, c)),
			S.divider(),
			S.listItem()
				.title('Blog posts')
				.id('blogPost')
				.child(S.documentTypeList('blogPost').title('Blog posts')),
			S.listItem()
				.title('Practice areas')
				.id('practiceArea')
				.child(S.documentTypeList('practiceArea').title('Practice areas')),
			S.listItem()
				.title('Team members')
				.id('teamMember')
				.child(S.documentTypeList('teamMember').title('Team members')),
			S.listItem()
				.title('Job pages')
				.id('jobPage')
				.child(S.documentTypeList('jobPage').title('Job pages')),
		]);
