import type { PortableTextBlock } from '@portabletext/types';

function randomKey(): string {
	return Math.random().toString(36).slice(2, 11);
}

/** Plain markdown-ish body (paragraphs separated by blank lines) → Portable Text. */
export function markdownParagraphsToPortableText(body: string): PortableTextBlock[] {
	const parts = body
		.split(/\n{2,}/)
		.map((p) => p.trim())
		.filter(Boolean);
	return parts.map(
		(text) =>
			({
				_type: 'block',
				_key: randomKey(),
				style: 'normal',
				markDefs: [],
				children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
			}) as PortableTextBlock,
	);
}
