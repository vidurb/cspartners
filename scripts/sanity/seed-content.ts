/**
 * Upserts singleton documents and the default internship `jobPage` in Sanity.
 *
 * Requires env: `SANITY_API_WRITE_TOKEN` (Editor token with write access).
 *
 * Usage: `pnpm sanity:seed`
 */
import { createClient, type SanityDocument } from '@sanity/client';
import {
	DEFAULT_ABOUT_PAGE,
	DEFAULT_CONTACT_FORM_SETTINGS,
	DEFAULT_CONTACT_PAGE,
	DEFAULT_DISCLAIMER_SETTINGS,
	DEFAULT_HOME_PAGE,
	DEFAULT_INTERNSHIP_JOB,
	DEFAULT_SITE_SETTINGS,
	SINGLETON_IDS,
} from '../../src/lib/sanity/fallbacks';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_API_PROJECT_ID ?? 'u1i19rrb';
const dataset = process.env.PUBLIC_SANITY_DATASET ?? process.env.SANITY_STUDIO_API_DATASET ?? 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
	console.error('Missing SANITY_API_WRITE_TOKEN. Add it to your environment and retry.');
	process.exit(1);
}

const client = createClient({
	projectId,
	dataset,
	apiVersion: 'v2026-04-22',
	token,
	useCdn: false,
});

function stripInternalId<T extends Record<string, unknown>>(doc: T): Omit<T, '_id'> {
	const { _id: _ignored, ...rest } = doc;
	return rest;
}

async function upsert(doc: SanityDocument) {
	await client.createOrReplace(doc);
	console.log('Upserted', doc._id);
}

async function main() {
	const { _id: _s, ...siteFields } = stripInternalId(DEFAULT_SITE_SETTINGS as Record<string, unknown>);
	await upsert({
		_id: SINGLETON_IDS.siteSettings,
		_type: 'siteSettings',
		...siteFields,
	} as SanityDocument);

	const { _id: _h, ...homeFields } = stripInternalId(DEFAULT_HOME_PAGE as Record<string, unknown>);
	await upsert({
		_id: SINGLETON_IDS.homePage,
		_type: 'homePage',
		...homeFields,
	} as SanityDocument);

	const { _id: _a, sections, ...aboutRest } = stripInternalId(DEFAULT_ABOUT_PAGE as Record<string, unknown>);
	await upsert({
		_id: SINGLETON_IDS.aboutPage,
		_type: 'aboutPage',
		sections,
		...aboutRest,
	} as SanityDocument);

	const { _id: _c, ...contactFields } = stripInternalId(DEFAULT_CONTACT_PAGE as Record<string, unknown>);
	await upsert({
		_id: SINGLETON_IDS.contactPage,
		_type: 'contactPage',
		...contactFields,
	} as SanityDocument);

	const { _id: _d, bullets, ...discRest } = stripInternalId(DEFAULT_DISCLAIMER_SETTINGS as Record<string, unknown>);
	await upsert({
		_id: SINGLETON_IDS.disclaimerSettings,
		_type: 'disclaimerSettings',
		bullets,
		...discRest,
	} as SanityDocument);

	const { _id: _f, ...formFields } = stripInternalId(DEFAULT_CONTACT_FORM_SETTINGS as Record<string, unknown>);
	await upsert({
		_id: SINGLETON_IDS.contactFormSettings,
		_type: 'contactFormSettings',
		...formFields,
	} as SanityDocument);

	const internshipId = 'jobPage-internship';
	const job = DEFAULT_INTERNSHIP_JOB;
	await upsert({
		_id: internshipId,
		_type: 'jobPage',
		title: job.title,
		slug: { _type: 'slug', current: job.slug },
		description: job.description,
		published: true,
		sortOrder: 0,
		body: job.body,
		howToApplyHeading: job.howToApplyHeading,
		howToApplyBody: job.howToApplyBody,
	} as SanityDocument);

	console.log('Done. Open Studio → Singletons / Job pages to review.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
