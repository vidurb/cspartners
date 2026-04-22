import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { SANITY_DATASET, SANITY_PROJECT_ID } from './constants';

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET });

export function urlForImage(source: SanityImageSource | null | undefined, width?: number): string | undefined {
	if (!source) return undefined;
	const img = builder.image(source);
	return width ? img.width(width).url() : img.url();
}

/** Prefer direct CDN `url` from GROQ when present; otherwise build from asset ref. */
export function resolveImageUrl(
	image: { asset?: { url?: string; _ref?: string } | null } | null | undefined,
	width?: number,
): string | undefined {
	if (!image?.asset) return undefined;
	if (typeof image.asset === 'object' && 'url' in image.asset && image.asset.url) {
		return image.asset.url;
	}
	return urlForImage(image as SanityImageSource, width);
}
