/**
 * One-off / repeatable import from local markdown + team data → Sanity `production`.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... pnpm sanity:import           # upsert docs + assets
 *   pnpm sanity:import:dry                                  # parse only, no API writes
 *   pnpm sanity:import:verify                               # compare file counts vs dataset
 */
import fs, { createReadStream } from 'node:fs';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import { createClient, type SanityClient } from '@sanity/client';

import { teamMembers } from '../../src/data/team.ts';
import { htmlToPortableText } from './htmlToPortableText.ts';
import { markdownParagraphsToPortableText } from './markdownToPortableText.ts';
import { slugify } from './slugify.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

const PROJECT_ID = process.env.SANITY_STUDIO_API_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? 'u1i19rrb';
const DATASET = process.env.SANITY_STUDIO_API_DATASET ?? process.env.SANITY_DATASET ?? 'production';
const API_VERSION = '2025-04-22';
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry-run');
const VERIFY = args.has('--verify');
const CONTENT_TYPES = ['blogPost', 'practiceArea', 'teamMember'] as const;

const countsByTypeQuery = `{
  "blogPost": count(*[_type == "blogPost"]),
  "practiceArea": count(*[_type == "practiceArea"]),
  "teamMember": count(*[_type == "teamMember"])
}`;

const imageCache = new Map<string, { _type: 'image'; asset: { _type: 'reference'; _ref: string } }>();

function writeClient(): SanityClient {
	if (!TOKEN) {
		throw new Error('SANITY_API_WRITE_TOKEN is required for import (omit for --dry-run / --verify).');
	}
	return createClient({
		projectId: PROJECT_ID,
		dataset: DATASET,
		apiVersion: API_VERSION,
		token: TOKEN,
		useCdn: false,
	});
}

function readClient(): SanityClient {
	return createClient({
		projectId: PROJECT_ID,
		dataset: DATASET,
		apiVersion: API_VERSION,
		useCdn: true,
	});
}

async function uploadImageFile(c: SanityClient, absPath: string, filename: string) {
	const cacheKey = absPath;
	if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)!;
	const stream = createReadStream(absPath);
	const asset = await c.assets.upload('image', stream, { filename });
	const doc = { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } };
	imageCache.set(cacheKey, doc);
	return doc;
}

async function uploadImageFromUrl(c: SanityClient, url: string, filename: string) {
	const cacheKey = `url:${url}`;
	if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)!;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
	const buf = Buffer.from(await res.arrayBuffer());
	const asset = await c.assets.upload('image', buf, { filename });
	const doc = { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } };
	imageCache.set(cacheKey, doc);
	return doc;
}

async function resolveImage(
	c: SanityClient,
	relativeFromFile: string,
	filePath: string,
	fallbackUrls: string[],
): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } }> {
	const abs = path.resolve(path.dirname(filePath), relativeFromFile);
	const filename = path.basename(abs);
	if (fs.existsSync(abs)) {
		return uploadImageFile(c, abs, filename);
	}
	for (const url of fallbackUrls) {
		try {
			return await uploadImageFromUrl(c, url, filename);
		} catch {
			// try next
		}
	}
	throw new Error(`Could not resolve image for ${relativeFromFile} (from ${filePath})`);
}

function logImagePlan(relativeFromFile: string, filePath: string, fallbackUrls: string[]) {
	const abs = path.resolve(path.dirname(filePath), relativeFromFile);
	if (fs.existsSync(abs)) console.log(`  [image] local: ${abs}`);
	else console.log(`  [image] would try remote: ${fallbackUrls.join(' | ')}`);
}

function createDocumentId(type: (typeof CONTENT_TYPES)[number]): string {
	return `${type}.${randomUUID()}`;
}

async function wipeContent(c: SanityClient) {
	const ids = await c.fetch<string[]>(
		`*[_type in $types && !(_id in path("versions.**"))]._id`,
		{ types: CONTENT_TYPES },
	);

	if (ids.length === 0) {
		console.log('No existing content documents to wipe.');
		return;
	}

	let tx = c.transaction();
	for (const id of ids) {
		tx = tx.delete(id);
	}
	await tx.commit();
	console.log(`Wiped ${ids.length} existing content document(s).`);
}

async function importBlogs(c: SanityClient) {
	const dir = path.join(root, 'src/content/blog');
	const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
	for (const file of files) {
		const filePath = path.join(dir, file);
		const slug = file.replace(/\.mdx?$/, '');
		const raw = fs.readFileSync(filePath, 'utf8');
		const { data, content } = matter(raw);
		const title = data.title as string;
		const description = data.description as string;
		const pubDate = data.pubDate as string;
		const author = (data.author as string) ?? 'C&S Partners';
		const heroRel = data.heroImage as string | undefined;
		const bodyHtml = content.trim();
		const body = htmlToPortableText(bodyHtml);
		const fallbackHero = heroRel
			? [`https://cspartners.in/wp-content/uploads/2026/03/${path.basename(heroRel)}`]
			: [];

		if (DRY) {
			if (heroRel) logImagePlan(heroRel, filePath, fallbackHero);
			console.log(`[dry-run] blogPost ${slug}: "${title}" (${body.length} blocks)`);
			continue;
		}

		const heroImage = heroRel ? await resolveImage(c, heroRel, filePath, fallbackHero) : undefined;
		const doc = {
			_id: createDocumentId('blogPost'),
			_type: 'blogPost',
			title,
			slug: { _type: 'slug', current: slug },
			description,
			publishedAt: pubDate,
			author,
			heroImage,
			body,
		};
		await c.create(doc as never);
		console.log(`Imported blogPost: ${slug}`);
	}
	return files.length;
}

async function importPracticeAreas(c: SanityClient) {
	const dir = path.join(root, 'src/content/practice-areas');
	const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
	for (const file of files) {
		const filePath = path.join(dir, file);
		const slug = file.replace(/\.md$/, '');
		const raw = fs.readFileSync(filePath, 'utf8');
		const { data, content } = matter(raw);
		const title = data.title as string;
		const description = data.description as string;
		const order = data.order as number;
		const iconRel = data.icon as string;
		const body = markdownParagraphsToPortableText(content.trim());
		const fallbackIcon = [`https://cspartners.in/wp-content/uploads/2026/03/${path.basename(iconRel)}`];

		if (DRY) {
			logImagePlan(iconRel, filePath, fallbackIcon);
			console.log(`[dry-run] practiceArea ${slug}: "${title}" order=${order}`);
			continue;
		}

		const icon = await resolveImage(c, iconRel, filePath, fallbackIcon);
		const doc = {
			_id: createDocumentId('practiceArea'),
			_type: 'practiceArea',
			title,
			slug: { _type: 'slug', current: slug },
			description,
			order,
			icon,
			body,
		};
		await c.create(doc as never);
		console.log(`Imported practiceArea: ${slug}`);
	}
	return files.length;
}

async function importTeam(c: SanityClient) {
	let i = 0;
	for (const m of teamMembers) {
		const slug = slugify(m.name);
		const local = path.join(root, 'public/team', m.image);
		const remote = `https://cspartners.in/team/${encodeURIComponent(m.image)}`;

		if (DRY) {
			if (fs.existsSync(local)) console.log(`  [image] team local: ${local}`);
			else console.log(`  [image] team remote: ${remote}`);
			console.log(`[dry-run] teamMember ${slug}: ${m.name}`);
			i++;
			continue;
		}

		let photo;
		if (fs.existsSync(local)) {
			photo = await uploadImageFile(c, local, m.image);
		} else {
			photo = await uploadImageFromUrl(c, remote, m.image);
		}
		const doc = {
			_id: createDocumentId('teamMember'),
			_type: 'teamMember',
			name: m.name,
			slug: { _type: 'slug', current: slug },
			role: m.role,
			photo,
			...(m.profilePdf ? { profilePdf: m.profilePdf } : {}),
			sortOrder: i,
		};
		await c.create(doc as never);
		console.log(`Imported teamMember: ${slug}`);
		i++;
	}
	return teamMembers.length;
}

async function verify() {
	const rc = readClient();
	const counts = await rc.fetch<{ blogPost: number; practiceArea: number; teamMember: number }>(countsByTypeQuery);
	const blogDir = path.join(root, 'src/content/blog');
	const practiceDir = path.join(root, 'src/content/practice-areas');
	const expectedBlog = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx')).length;
	const expectedPractice = fs.readdirSync(practiceDir).filter((f) => f.endsWith('.md')).length;
	const expectedTeam = teamMembers.length;
	console.log('Dataset counts:', counts);
	console.log('Expected (local files):', {
		blogPost: expectedBlog,
		practiceArea: expectedPractice,
		teamMember: expectedTeam,
	});
	const ok =
		counts.blogPost === expectedBlog &&
		counts.practiceArea === expectedPractice &&
		counts.teamMember === expectedTeam;
	process.exit(ok ? 0 : 1);
}

async function main() {
	if (VERIFY) {
		await verify();
		return;
	}
	if (DRY) {
		console.log('Dry run (no writes)');
		const noop = {} as SanityClient;
		await importBlogs(noop);
		await importPracticeAreas(noop);
		await importTeam(noop);
		return;
	}
	const c = writeClient();
	await wipeContent(c);
	await importBlogs(c);
	await importPracticeAreas(c);
	await importTeam(c);
	console.log('Done.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
