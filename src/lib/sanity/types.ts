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

/** Must stay in sync with Sanity `teamMember.role` options. */
export const TEAM_MEMBER_ROLE_VALUES = [
	'Associate',
	'Senior Associate',
	'Managing Associate',
	'Partner',
	'Of-Counsel',
	'Senior Partner',
] as const;

export type TeamMemberRole = (typeof TEAM_MEMBER_ROLE_VALUES)[number];

export type TeamMemberDoc = {
	_id: string;
	name: string;
	slug: string;
	role: TeamMemberRole;
	photo?: SanityImageAsset | null;
	profilePdf?: string | null;
};

export type NavLink = { _key?: string; label: string; href: string };

export type Office = {
	_key?: string;
	label: string;
	street: string;
	city: string;
	phone: string;
	mapEmbedUrl?: string | null;
	mapIframeTitle?: string | null;
};

export type SiteSettingsDoc = {
	_id?: string;
	siteTitle: string;
	siteDescription?: string | null;
	navLinks: NavLink[];
	contactEmail: string;
	offices: Office[];
	footerTagline?: string | null;
	footerNavigateHeading?: string | null;
	footerOfficesHeading?: string | null;
	footerContactHeading?: string | null;
	headerHomeAriaLabel?: string | null;
	mobileMenuHomeLabel?: string | null;
	blogAuthorFallback?: string | null;
	blogReadMoreLabel?: string | null;
	practiceAreaCtaLabel?: string | null;
};

export type HomePageDoc = {
	_id?: string;
	heroTitle?: string | null;
	heroSubtitle?: string | null;
	heroCtaLabel?: string | null;
	heroCtaHref?: string | null;
	founderHeading?: string | null;
	founderBody?: PortableTextBlock[] | null;
	founderSignature?: string | null;
	founderCtaLabel?: string | null;
	founderCtaHref?: string | null;
	founderImage?: SanityImageAsset | null;
	practiceAreasHeading?: string | null;
	practiceAreasIntro?: string | null;
	practiceAreasViewAllLabel?: string | null;
	teamHeading?: string | null;
	teamMeetFullLabel?: string | null;
	blogsHeading?: string | null;
	blogsAllArticlesLabel?: string | null;
	contactSectionHeading?: string | null;
};

export type AboutSection = {
	_key?: string;
	heading?: string | null;
	body?: PortableTextBlock[] | null;
};

export type AboutPageDoc = {
	_id?: string;
	sections?: AboutSection[] | null;
	practiceAreasCtaLabel?: string | null;
	practiceAreasCtaHref?: string | null;
	contactSectionHeading?: string | null;
};

export type ContactPageDoc = {
	_id?: string;
	heroTitle?: string | null;
	heroSubtitle?: string | null;
	emailSectionHeading?: string | null;
	contactFormSectionHeading?: string | null;
	internshipsHeading?: string | null;
	internshipsBody?: string | null;
	internshipsCtaLabel?: string | null;
	internshipsCtaHref?: string | null;
};

export type DisclaimerBullet = { _key?: string; text?: string | null };

export type DisclaimerSettingsDoc = {
	_id?: string;
	title?: string | null;
	bullets?: DisclaimerBullet[] | null;
	acceptButtonLabel?: string | null;
};

export type ContactFormSettingsDoc = {
	_id?: string;
	intro?: string | null;
	nameLabel?: string | null;
	namePlaceholder?: string | null;
	mobileLabel?: string | null;
	mobilePlaceholder?: string | null;
	emailLabel?: string | null;
	emailPlaceholder?: string | null;
	messageLabel?: string | null;
	messagePlaceholder?: string | null;
	submitLabel?: string | null;
	footnote?: string | null;
};

export type JobPageDetail = {
	_id: string;
	title: string;
	slug: string;
	description?: string | null;
	published?: boolean | null;
	sortOrder?: number | null;
	body?: PortableTextBlock[] | null;
	howToApplyHeading?: string | null;
	howToApplyBody?: PortableTextBlock[] | null;
};

export type JobPageListItem = {
	_id: string;
	title: string;
	slug: string;
	description?: string | null;
	published?: boolean | null;
	sortOrder?: number | null;
};

export type LayoutSingletonsBundle = {
	site: SiteSettingsDoc | null;
	disclaimer: DisclaimerSettingsDoc | null;
	contactForm: ContactFormSettingsDoc | null;
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
