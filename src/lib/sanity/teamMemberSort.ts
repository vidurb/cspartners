import { stegaClean } from '@sanity/client/stega';
import type { TeamMemberDoc, TeamMemberRole } from './types';

/** Full team listing: precedence within role bands (then name). */
const LISTING_ROLE_ORDER: TeamMemberRole[] = [
	'Senior Partner',
	'Partner',
	'Of-Counsel',
	'Managing Associate',
	'Senior Associate',
	'Associate',
];

const listingRank = new Map(LISTING_ROLE_ORDER.map((role, i) => [role, i]));

/** Homepage carousel: only these roles, in this order, then by name. */
const HOME_CAROUSEL_ROLE_ORDER: TeamMemberRole[] = ['Senior Partner', 'Of-Counsel', 'Partner'];

const homeRank = new Map(HOME_CAROUSEL_ROLE_ORDER.map((role, i) => [role, i]));

function cleanSanityString(value: string): string {
	return stegaClean(value);
}

function listingRoleRank(role: string): number {
	return listingRank.get(cleanSanityString(role) as TeamMemberRole) ?? 999;
}

function homeRoleRank(role: string): number {
	return homeRank.get(cleanSanityString(role) as TeamMemberRole) ?? 999;
}

export function sortTeamMembersForListing(a: TeamMemberDoc, b: TeamMemberDoc): number {
	const rd = listingRoleRank(a.role) - listingRoleRank(b.role);
	if (rd !== 0) return rd;
	return cleanSanityString(a.name).localeCompare(cleanSanityString(b.name), undefined, { sensitivity: 'base' });
}

export function isHomepageTeamCarouselRole(role: string): role is TeamMemberRole {
	return homeRank.has(cleanSanityString(role) as TeamMemberRole);
}

export function sortTeamMembersForHomeCarousel(a: TeamMemberDoc, b: TeamMemberDoc): number {
	const rd = homeRoleRank(a.role) - homeRoleRank(b.role);
	if (rd !== 0) return rd;
	return cleanSanityString(a.name).localeCompare(cleanSanityString(b.name), undefined, { sensitivity: 'base' });
}
