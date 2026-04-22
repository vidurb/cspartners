import * as cheerio from 'cheerio';
import type { PortableTextBlock } from '@portabletext/types';

function randomKey(): string {
	return Math.random().toString(36).slice(2, 11);
}

type MarkDef = { _key: string; _type: string; href?: string };

type SpanChild = { _type: 'span'; _key: string; text: string; marks: string[] };

function inlineFromNode(
	$: cheerio.CheerioAPI,
	el: cheerio.Cheerio<any>,
	markDefs: MarkDef[],
	marks: string[],
): SpanChild[] {
	const out: SpanChild[] = [];
	for (const node of el.contents().toArray()) {
		if (node.type === 'text') {
			const text = (node as unknown as { data?: string }).data ?? '';
			if (text) {
				out.push({ _type: 'span', _key: randomKey(), text, marks: [...marks] });
			}
			continue;
		}
		if (node.type !== 'tag') continue;
		const tag = ((node as { tagName?: string }).tagName ?? '').toLowerCase();
		const $child = $(node);
		if (tag === 'strong' || tag === 'b') {
			out.push(...inlineFromNode($, $child, markDefs, [...marks, 'strong']));
		} else if (tag === 'em' || tag === 'i') {
			out.push(...inlineFromNode($, $child, markDefs, [...marks, 'em']));
		} else if (tag === 'a') {
			const href = $child.attr('href') ?? '';
			const key = randomKey();
			markDefs.push({ _type: 'link', _key: key, href });
			out.push(...inlineFromNode($, $child, markDefs, [...marks, key]));
		} else if (tag === 'br') {
			out.push({ _type: 'span', _key: randomKey(), text: '\n', marks: [...marks] });
		} else {
			out.push(...inlineFromNode($, $child, markDefs, marks));
		}
	}
	return out;
}

function normalizeSpans(spans: SpanChild[]): SpanChild[] {
	const merged: SpanChild[] = [];
	for (const s of spans) {
		const prev = merged[merged.length - 1];
		const sameMarks =
			prev &&
			prev.marks.length === s.marks.length &&
			prev.marks.every((m, i) => m === s.marks[i]);
		if (sameMarks) {
			prev.text += s.text;
		} else {
			merged.push({ ...s });
		}
	}
	return merged;
}

function paragraphBlock(html: string): PortableTextBlock {
	const $ = cheerio.load(`<div class="import-root">${html}</div>`);
	const el = $('.import-root').first();
	const markDefs: MarkDef[] = [];
	let children = inlineFromNode($, el, markDefs, []);
	children = normalizeSpans(children);
	if (children.length === 0) {
		children = [{ _type: 'span', _key: randomKey(), text: '', marks: [] }];
	}
	return {
		_type: 'block',
		_key: randomKey(),
		style: 'normal',
		markDefs,
		children,
	} as PortableTextBlock;
}

/** Converts HTML (typically `<p>...</p>` fragments) to Sanity-style Portable Text blocks. */
export function htmlToPortableText(html: string): PortableTextBlock[] {
	const trimmed = html.trim();
	if (!trimmed) return [];
	const $ = cheerio.load(`<div class="import-root">${trimmed}</div>`);
	const root = $('.import-root').first();
	const blocks: PortableTextBlock[] = [];
	const topPs = root.children('p');
	if (topPs.length > 0) {
		topPs.each((_, p) => {
			const inner = $(p).html() ?? '';
			const textOnly = $(p).text().trim();
			if (textOnly) blocks.push(paragraphBlock(inner));
		});
	} else {
		const textOnly = root.text().trim();
		if (textOnly) blocks.push(paragraphBlock(root.html() ?? ''));
	}
	return blocks;
}
