import type { PortableTextBlock } from '@portabletext/types';

export type SanitySlug = { current?: string };

export type BlogPostListItem = {
	_id: string;
	title: string;
	slug: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	author?: string;
	heroImage?: SanityImageAsset | null;
	body?: PortableTextBlock[] | null;
};

export type BlogPostDetail = BlogPostListItem & {
	body?: PortableTextBlock[] | null;
};

export type PracticeAreaListItem = {
	_id: string;
	title: string;
	slug: string;
	description: string;
	order: number;
	icon?: SanityImageAsset | null;
	body?: PortableTextBlock[] | null;
};

export type PracticeAreaDetail = PracticeAreaListItem & {
	body?: PortableTextBlock[] | null;
};

export type TeamMemberDoc = {
	_id: string;
	name: string;
	slug: string;
	role: string;
	sortOrder: number;
	photo?: SanityImageAsset | null;
	profilePdf?: string | null;
};

/** After GROQ `asset->` expansion */
export type SanityImageAsset = {
	_type?: string;
	asset?: {
		_id?: string;
		_ref?: string;
		url?: string;
		metadata?: { dimensions?: { width: number; height: number } };
	};
};
