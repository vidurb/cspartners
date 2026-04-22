export const SITE_TITLE = 'C&S Partners';
export const SITE_DESCRIPTION =
	'With more than three decades of hands-on experience in the practice of law, C&S Partners was established in October 2023 as a boutique firm providing focussed, solution-oriented legal services.';

export const CONTACT = {
	email: 'contact@cspartners.in',
	delhi: {
		label: 'New Delhi',
		street: 'C-2/6, Sri Aurobindo Marg, Safdarjung Development Area',
		city: 'New Delhi – 110016',
		phone: '+91-11-41564134',
	},
	mumbai: {
		label: 'Mumbai',
		street: '203, Madhava Premises, 203, E Block, Bandra Kurla Complex',
		city: 'Mumbai, Maharashtra 400051',
		phone: '+91-22-35227272',
	},
} as const;

export const NAV_LINKS = [
	{ href: '/about-us', label: 'About Us' },
	{ href: '/practice-area', label: 'Practice Areas' },
	{ href: '/our-team', label: 'Our Team' },
	{ href: '/blog', label: 'Blogs' },
	{ href: '/contact-career', label: 'Contact Us & Careers' },
] as const;
