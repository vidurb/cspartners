import { createDataAttribute } from '@sanity/visual-editing';

const STUDIO_BASE_URL = '/admin';

export function singletonDataAttribute(
	type: string,
	path: string,
	id = type,
): string {
	return createDataAttribute({
		id,
		type,
		path,
		baseUrl: STUDIO_BASE_URL,
	}).toString();
}

export function keyedArrayFieldPath(
	arrayField: string,
	key: string | null | undefined,
	field: string,
): string | undefined {
	return key ? `${arrayField}[_key=="${key}"].${field}` : undefined;
}
