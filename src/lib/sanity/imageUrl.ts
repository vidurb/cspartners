import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { SANITY_DATASET, SANITY_PROJECT_ID } from './constants';

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET });

export function urlForImage(source: SanityImageSource | null | undefined, width?: number): string | undefined {
	if (!source) return undefined;
	const img = builder.image(source);
	return width ? img.width(width).url() : img.url();
}

/**
 * Resolve a Sanity image URL. When `width` is set, uses the image CDN builder so sizing is correct for src/srcset.
 * Without `width`, prefers the direct `asset.url` from GROQ when present.
 */
export function resolveImageUrl(
	image: {
		asset?: { url?: string; _ref?: string; metadata?: { dimensions?: { width: number } } } | null;
	} | null | undefined,
	width?: number,
): string | undefined {
	if (!image?.asset) return undefined;
	if (width != null) {
		return urlForImage(image as SanityImageSource, width);
	}
	if (typeof image.asset === 'object' && 'url' in image.asset && image.asset.url) {
		return image.asset.url;
	}
	return urlForImage(image as SanityImageSource);
}

const DEFAULT_SRCSET_WIDTHS = [300, 768, 1024, 1536, 2048] as const;

/** Comma-separated srcset for responsive `<img>`; caps widths by intrinsic dimensions when known. */
export function buildImageSrcset(
	image: Parameters<typeof resolveImageUrl>[0],
	widths: readonly number[] = DEFAULT_SRCSET_WIDTHS,
): string | undefined {
	if (!image?.asset) return undefined;
	const maxW = image.asset.metadata?.dimensions?.width;
	let chosen = maxW ? widths.filter((w) => w <= maxW) : [...widths];
	if (maxW && !chosen.includes(maxW)) chosen = [...chosen, maxW];
	chosen = [...new Set(chosen)].sort((a, b) => a - b);
	const parts: string[] = [];
	for (const w of chosen) {
		const u = urlForImage(image as SanityImageSource, w);
		if (u) parts.push(`${u} ${w}w`);
	}
	return parts.length ? parts.join(', ') : undefined;
}
