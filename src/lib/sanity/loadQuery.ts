import type { QueryParams } from 'sanity';
import { sanityClient } from 'sanity:client';

const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true';
const token = import.meta.env.SANITY_API_READ_TOKEN;

export async function loadQuery<QueryResponse>(
	query: string,
	params: QueryParams = {},
): Promise<QueryResponse> {
	if (visualEditingEnabled && !token) {
		throw new Error('SANITY_API_READ_TOKEN is required when Sanity Visual Editing is enabled.');
	}

	const { result } = await sanityClient.fetch<QueryResponse>(query, params, {
		filterResponse: false,
		perspective: visualEditingEnabled ? 'drafts' : 'published',
		resultSourceMap: visualEditingEnabled ? 'withKeyArraySelector' : false,
		stega: visualEditingEnabled,
		...(visualEditingEnabled ? { token } : {}),
		useCdn: false,
	});

	return result;
}
