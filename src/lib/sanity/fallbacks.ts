import type { PortableTextBlock } from '@portabletext/types';
import type {
	AboutPageDoc,
	ContactFormSettingsDoc,
	ContactPageDoc,
	DisclaimerSettingsDoc,
	HomePageDoc,
	JobPageDetail,
	NavLink,
	Office,
	SiteSettingsDoc,
} from './types';

/** Default singleton `_id`s (must match Studio / seed). */
export const SINGLETON_IDS = {
	siteSettings: 'siteSettings',
	homePage: 'homePage',
	aboutPage: 'aboutPage',
	contactPage: 'contactPage',
	disclaimerSettings: 'disclaimerSettings',
	contactFormSettings: 'contactFormSettings',
} as const;

export const DEFAULT_NAV_LINKS: NavLink[] = [
	{ href: '/about-us', label: 'About Us' },
	{ href: '/practice-area', label: 'Practice Areas' },
	{ href: '/our-team', label: 'Our Team' },
	{ href: '/blog', label: 'Blogs' },
	{ href: '/contact-career', label: 'Contact Us & Careers' },
];

export const DEFAULT_OFFICES: Office[] = [
	{
		label: 'New Delhi',
		street: 'C-2/6, Sri Aurobindo Marg, Safdarjung Development Area',
		city: 'New Delhi – 110016',
		phone: '+91-11-41564134',
		mapEmbedUrl:
			'https://www.google.com/maps?q=C-2%2F6%2C%20Sri%20Aurobindo%20Marg%20Safdarjung%20Development%20Area%20New%20Delhi%20110016&output=embed',
		mapIframeTitle: 'C&S Partners New Delhi office',
	},
	{
		label: 'Mumbai',
		street: '203, Madhava Premises, 203, E Block, Bandra Kurla Complex',
		city: 'Mumbai, Maharashtra 400051',
		phone: '+91-22-35227272',
		mapEmbedUrl: 'https://www.google.com/maps?q=203%20Madhava%20Premises%20Bandra%20Kurla%20Complex%20Mumbai&output=embed',
		mapIframeTitle: 'C&S Partners Mumbai office',
	},
];

export const DEFAULT_SITE_SETTINGS: SiteSettingsDoc = {
	_id: SINGLETON_IDS.siteSettings,
	siteTitle: 'C&S Partners',
	siteDescription:
		'With more than three decades of hands-on experience in the practice of law, C&S Partners was established in October 2023 as a boutique firm providing focussed, solution-oriented legal services.',
	navLinks: DEFAULT_NAV_LINKS,
	contactEmail: 'contact@cspartners.in',
	offices: DEFAULT_OFFICES,
	footerTagline: 'C&S Partners — New Delhi & Mumbai.',
	footerNavigateHeading: 'Navigate',
	footerOfficesHeading: 'Offices',
	footerContactHeading: 'Contact',
	headerHomeAriaLabel: 'C&S Partners home',
	mobileMenuHomeLabel: 'C&S Partners',
	blogAuthorFallback: 'C&S Partners',
	blogReadMoreLabel: 'Read more',
	practiceAreaCtaLabel: 'Get in touch',
};

const founderBodyFallback: PortableTextBlock[] = [
	{
		_type: 'block',
		_key: 'fb1',
		style: 'normal',
		markDefs: [],
		children: [
			{
				_type: 'span',
				_key: 's1',
				text: "For over three decades, we have walked the same corridors of law — as students, colleagues, and partners bound by a shared purpose. C&S Partners reflects not only our collective experience, but the values that have shaped us: integrity, clarity, and commitment to those who trust us.",
				marks: [],
			},
		],
	},
	{
		_type: 'block',
		_key: 'fb2',
		style: 'normal',
		markDefs: [],
		children: [
			{
				_type: 'span',
				_key: 's2',
				text: 'At the heart of our practice is a simple belief: clients deserve advice that is legally sound and practically workable — grounded in ethics, informed by experience, and tailored to real-world outcomes.',
				marks: [],
			},
		],
	},
];

export const DEFAULT_HOME_PAGE: HomePageDoc = {
	_id: SINGLETON_IDS.homePage,
	heroTitle: 'Welcome to C&S Partners',
	heroSubtitle:
		'Integrity in every action, clarity in every solution, and an unwavering commitment to those who place their trust in us.',
	heroCtaLabel: "Let's Connect",
	heroCtaHref: '/contact-career',
	founderHeading: "From the Founder's Desk",
	founderBody: founderBodyFallback,
	founderSignature: "— H.S. ‘Bobby’ Chandhoke, Sudhir Sharma & Deepali Chandhoke",
	founderCtaLabel: 'Know more →',
	founderCtaHref: '/about-us',
	practiceAreasHeading: 'Practice Areas',
	practiceAreasIntro: 'Full-service capabilities across disputes, regulatory matters, transactions, and compliance.',
	practiceAreasViewAllLabel: 'View all practice areas →',
	teamHeading: 'Our Team',
	teamMeetFullLabel: 'Meet the full team →',
	blogsHeading: 'Our Blogs',
	blogsAllArticlesLabel: 'All articles →',
	contactSectionHeading: 'Contact Us',
};

function aboutSection(heading: string, paragraphs: string[]): { heading: string; body: PortableTextBlock[] } {
	return {
		heading,
		body: paragraphs.map((text, i) => ({
			_type: 'block' as const,
			_key: `ab-${heading}-${i}`,
			style: 'normal' as const,
			markDefs: [],
			children: [{ _type: 'span' as const, _key: `sp-${i}`, text, marks: [] as const }],
		})),
	};
}

export const DEFAULT_ABOUT_PAGE: AboutPageDoc = {
	_id: SINGLETON_IDS.aboutPage,
	sections: [
		aboutSection("From the Founders' Desk", [
			'For over three decades, the three of us have walked the same corridors of law. Initially as law students, then as colleagues, and eventually as partners bound by a shared purpose. C&S Partners is the natural extension of that journey. It reflects not just our collective experience, but the values that have shaped us since our earliest days in the profession: integrity in every action, clarity in every solution, and an unwavering commitment to the people who place their trust in us.',
			'At the heart of our practice is a simple belief: clients deserve advice that is both legally sound and practically workable. We approach every matter with a client‑centric mindset, ensuring that our strategies are grounded in ethics, informed by experience, and tailored to real‑world outcomes.',
			"— Harneet Singh 'Bobby' Chandhoke, Sudhir Sharma, Deepali Chandhoke",
		]),
		aboutSection('Who We Are', [
			'C&S Partners is a full-service law firm with offices in New Delhi and Mumbai. The firm is built on a commitment to clarity, strategy, and execution that aligns with the client’s long‑term interests. With a team of about 30 lawyers across Delhi & Mumbai, our partners and lawyers bring extensive experience across disputes, regulatory matters, corporate transactions and employment law advisory, enabling us to deliver legal solutions that are practical, precise, and tailored to the realities of modern business.',
		]),
		aboutSection('Client Centric Thinking, Always', [
			'We work seamlessly across jurisdictions through a trusted pan‑India network, ensuring that clients receive consistent quality, responsiveness, and strategic oversight wherever their matters arise.',
			'Our work begins with understanding the client’s business, industry, and risk landscape. Every piece of advice is shaped by commercial context and long‑term objectives. Whether the matter involves a regulatory investigation, developing a litigation strategy, advising on a cross‑border investment, or workplace compliance, our approach remains grounded in clarity, responsiveness, and outcomes that endure.',
		]),
		aboutSection('Strategy Before Action', [
			'We believe that strategy must lead every decision. Litigation is used thoughtfully, not reflexively. Before taking any step — whether filing a petition, responding to a notice, or structuring a transaction — we assess what will best advance the client’s interests. This discipline defines the way we work and sets the tone for every engagement.',
		]),
		aboutSection('Clarity in Process, Precision in Execution', [
			'Our matters are staffed with structured thinking and layered partner review. We invest in accuracy, preparation, and standards that match the complexity of the issues we handle — so clients receive advice they can rely on when stakes are high.',
		]),
		aboutSection('Collaboration That Strengthens Every Matter', [
			'We maintain an open-door culture where junior lawyers engage directly with clients and strategy. Collaboration across experience levels helps us deliver sharper analysis and more resilient outcomes.',
		]),
		aboutSection('What We Do', [
			'Our practice spans arbitration; civil, corporate and commercial litigation across Supreme Court, High Courts, NCLT, and tribunals; white-collar defence; regulatory work across SEBI, RBI, MCA, and related forums; mergers and acquisitions; private equity and venture capital; commercial contracts and due diligence; insolvency and bankruptcy; projects and infrastructure; employment and labour; and POSH & POCSO advisory.',
		]),
		aboutSection('Pan India Network', [
			'With offices in Delhi and Mumbai and a trusted counsel network across jurisdictions, we aim to deliver consistent preparation and strategic oversight wherever our clients need us.',
		]),
	],
	practiceAreasCtaLabel: 'Explore practice areas →',
	practiceAreasCtaHref: '/practice-area',
	contactSectionHeading: 'Contact Us',
};

export const DEFAULT_CONTACT_PAGE: ContactPageDoc = {
	_id: SINGLETON_IDS.contactPage,
	heroTitle: "Let's Connect",
	heroSubtitle: 'New Delhi & Mumbai',
	emailSectionHeading: 'Email',
	contactFormSectionHeading: 'Contact Us',
	internshipsHeading: 'Internships',
	internshipsBody:
		'We value clarity, drafting, and strategic problem-solving. Our culture is collaborative, with an open-door approach and mentorship for those early in their careers. If you are interested in an internship, learn more and apply through our internship page.',
	internshipsCtaLabel: 'Apply here',
	internshipsCtaHref: '/jobs/internship',
};

export const DEFAULT_DISCLAIMER_SETTINGS: DisclaimerSettingsDoc = {
	_id: SINGLETON_IDS.disclaimerSettings,
	title: 'Disclaimer',
	bullets: [
		{
			text: 'Bar Council rules prohibit solicitation and advertising. By using this website you confirm that you sought this information on your own initiative and that you have not been induced by the firm or its members.',
		},
		{
			text: 'Content is for general information only and does not constitute legal advice. No attorney–client relationship is created by your use of this site.',
		},
		{
			text: 'The firm is not liable for actions taken in reliance on this site. You should seek independent legal advice for your specific situation.',
		},
		{ text: 'Website content is the intellectual property of C&S Partners.' },
		{
			text: 'By clicking I Agree or continuing to use the site, you confirm that you have read and understood this disclaimer.',
		},
	],
	acceptButtonLabel: 'I Agree',
};

export const DEFAULT_CONTACT_FORM_SETTINGS: ContactFormSettingsDoc = {
	_id: SINGLETON_IDS.contactFormSettings,
	intro: 'We welcome your inquiries. If you require additional information, have a legal query, or wish to engage our services, please use this form. You may also reach us by telephone or email. A member of our team will respond promptly.',
	nameLabel: 'Name',
	namePlaceholder: 'Name',
	mobileLabel: 'Mobile number',
	mobilePlaceholder: 'Mobile number',
	emailLabel: 'Email',
	emailPlaceholder: 'Email',
	messageLabel: 'Message',
	messagePlaceholder: 'Message',
	submitLabel: 'Send',
	footnote: 'We respect your privacy. Your details are used only to respond to this inquiry.',
};

const internshipBodyBlocks: PortableTextBlock[] = [
	{
		_type: 'block',
		_key: 'jb1',
		style: 'normal',
		markDefs: [],
		children: [
			{
				_type: 'span',
				_key: 'j1',
				text: 'C&S Partners offers internship opportunities for motivated law students and recent graduates who want exposure to disputes, regulatory matters, transactions, and firm life in a collaborative environment.',
				marks: [],
			},
		],
	},
	{
		_type: 'block',
		_key: 'jb2',
		style: 'normal',
		markDefs: [],
		children: [
			{
				_type: 'span',
				_key: 'j2',
				text: 'We emphasize research, drafting, and clear thinking. Interns work alongside partners and associates on live matters where appropriate, with feedback and mentorship built into how we operate.',
				marks: [],
			},
		],
	},
];

const howToApplyLinkDefs = [
	{ _key: 'mailtoContact', _type: 'link' as const, href: 'mailto:contact@cspartners.in' },
	{ _key: 'pathContactCareer', _type: 'link' as const, href: '/contact-career' },
];

export const DEFAULT_INTERNSHIP_JOB: JobPageDetail = {
	_id: 'job-internship-fallback',
	title: 'Internship',
	slug: 'internship',
	description: 'Internship opportunities at C&S Partners — Delhi & Mumbai.',
	published: true,
	sortOrder: 0,
	body: internshipBodyBlocks,
	howToApplyHeading: 'How to apply',
	howToApplyBody: [
		{
			_type: 'block',
			_key: 'howto-1',
			style: 'normal',
			markDefs: howToApplyLinkDefs,
			children: [
				{
					_type: 'span',
					_key: 's1',
					text: 'Applications were previously submitted through the firm’s website portal. This static rebuild preserves the internship information page; to apply, please email ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 's2',
					text: 'contact@cspartners.in',
					marks: ['mailtoContact'],
				},
				{
					_type: 'span',
					_key: 's3',
					text: ' with your CV and a brief cover note, or use the contact form on the ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 's4',
					text: 'Contact',
					marks: ['pathContactCareer'],
				},
				{ _type: 'span', _key: 's5', text: ' page.', marks: [] },
			],
		},
	],
};
