import type {
	AboutPageDoc,
	ContactFormSettingsDoc,
	ContactPageDoc,
	DisclaimerSettingsDoc,
	HomePageDoc,
	LayoutSingletonsBundle,
	SiteSettingsDoc,
} from './types';
import {
	DEFAULT_ABOUT_PAGE,
	DEFAULT_CONTACT_FORM_SETTINGS,
	DEFAULT_CONTACT_PAGE,
	DEFAULT_DISCLAIMER_SETTINGS,
	DEFAULT_HOME_PAGE,
	DEFAULT_SITE_SETTINGS,
} from './fallbacks';

export function mergeSiteSettings(fetched: Partial<SiteSettingsDoc> | null | undefined): SiteSettingsDoc {
	const d = DEFAULT_SITE_SETTINGS;
	if (!fetched) return d;
	return {
		...d,
		...fetched,
		siteTitle: fetched.siteTitle?.trim() || d.siteTitle,
		siteDescription: fetched.siteDescription ?? d.siteDescription,
		navLinks: fetched.navLinks?.length ? fetched.navLinks : d.navLinks,
		contactEmail: fetched.contactEmail?.trim() || d.contactEmail,
		offices: fetched.offices?.length ? fetched.offices : d.offices,
		footerTagline: fetched.footerTagline ?? d.footerTagline,
		footerNavigateHeading: fetched.footerNavigateHeading ?? d.footerNavigateHeading,
		footerOfficesHeading: fetched.footerOfficesHeading ?? d.footerOfficesHeading,
		footerContactHeading: fetched.footerContactHeading ?? d.footerContactHeading,
		headerHomeAriaLabel: fetched.headerHomeAriaLabel ?? d.headerHomeAriaLabel,
		mobileMenuHomeLabel: fetched.mobileMenuHomeLabel ?? d.mobileMenuHomeLabel,
		blogAuthorFallback: fetched.blogAuthorFallback ?? d.blogAuthorFallback,
		blogReadMoreLabel: fetched.blogReadMoreLabel ?? d.blogReadMoreLabel,
		practiceAreaCtaLabel: fetched.practiceAreaCtaLabel ?? d.practiceAreaCtaLabel,
	};
}

export function mergeHomePage(fetched: Partial<HomePageDoc> | null | undefined): HomePageDoc {
	const d = DEFAULT_HOME_PAGE;
	if (!fetched) return d;
	return {
		...d,
		...fetched,
		heroTitle: fetched.heroTitle ?? d.heroTitle,
		heroSubtitle: fetched.heroSubtitle ?? d.heroSubtitle,
		heroCtaLabel: fetched.heroCtaLabel ?? d.heroCtaLabel,
		heroCtaHref: fetched.heroCtaHref ?? d.heroCtaHref,
		founderHeading: fetched.founderHeading ?? d.founderHeading,
		founderBody: fetched.founderBody?.length ? fetched.founderBody : d.founderBody,
		founderSignature: fetched.founderSignature ?? d.founderSignature,
		founderCtaLabel: fetched.founderCtaLabel ?? d.founderCtaLabel,
		founderCtaHref: fetched.founderCtaHref ?? d.founderCtaHref,
		founderImage: fetched.founderImage ?? d.founderImage,
		practiceAreasHeading: fetched.practiceAreasHeading ?? d.practiceAreasHeading,
		practiceAreasIntro: fetched.practiceAreasIntro ?? d.practiceAreasIntro,
		practiceAreasViewAllLabel: fetched.practiceAreasViewAllLabel ?? d.practiceAreasViewAllLabel,
		teamHeading: fetched.teamHeading ?? d.teamHeading,
		teamMeetFullLabel: fetched.teamMeetFullLabel ?? d.teamMeetFullLabel,
		blogsHeading: fetched.blogsHeading ?? d.blogsHeading,
		blogsAllArticlesLabel: fetched.blogsAllArticlesLabel ?? d.blogsAllArticlesLabel,
		contactSectionHeading: fetched.contactSectionHeading ?? d.contactSectionHeading,
	};
}

export function mergeAboutPage(fetched: Partial<AboutPageDoc> | null | undefined): AboutPageDoc {
	const d = DEFAULT_ABOUT_PAGE;
	if (!fetched) return d;
	return {
		...d,
		...fetched,
		sections: fetched.sections?.filter((s) => s.heading?.trim())?.length ? fetched.sections : d.sections,
		practiceAreasCtaLabel: fetched.practiceAreasCtaLabel ?? d.practiceAreasCtaLabel,
		practiceAreasCtaHref: fetched.practiceAreasCtaHref ?? d.practiceAreasCtaHref,
		contactSectionHeading: fetched.contactSectionHeading ?? d.contactSectionHeading,
	};
}

export function mergeContactPage(fetched: Partial<ContactPageDoc> | null | undefined): ContactPageDoc {
	const d = DEFAULT_CONTACT_PAGE;
	if (!fetched) return d;
	return {
		...d,
		...fetched,
		heroTitle: fetched.heroTitle ?? d.heroTitle,
		heroSubtitle: fetched.heroSubtitle ?? d.heroSubtitle,
		emailSectionHeading: fetched.emailSectionHeading ?? d.emailSectionHeading,
		contactFormSectionHeading: fetched.contactFormSectionHeading ?? d.contactFormSectionHeading,
		internshipsHeading: fetched.internshipsHeading ?? d.internshipsHeading,
		internshipsBody: fetched.internshipsBody ?? d.internshipsBody,
		internshipsCtaLabel: fetched.internshipsCtaLabel ?? d.internshipsCtaLabel,
		internshipsCtaHref: fetched.internshipsCtaHref ?? d.internshipsCtaHref,
	};
}

export function mergeDisclaimerSettings(
	fetched: Partial<DisclaimerSettingsDoc> | null | undefined,
): DisclaimerSettingsDoc {
	const d = DEFAULT_DISCLAIMER_SETTINGS;
	if (!fetched) return d;
	return {
		...d,
		...fetched,
		title: fetched.title ?? d.title,
		bullets: fetched.bullets?.filter((b) => b.text)?.length ? fetched.bullets : d.bullets,
		acceptButtonLabel: fetched.acceptButtonLabel ?? d.acceptButtonLabel,
	};
}

export function mergeContactFormSettings(
	fetched: Partial<ContactFormSettingsDoc> | null | undefined,
): ContactFormSettingsDoc {
	const d = DEFAULT_CONTACT_FORM_SETTINGS;
	if (!fetched) return d;
	return {
		...d,
		...fetched,
		intro: fetched.intro ?? d.intro,
		nameLabel: fetched.nameLabel ?? d.nameLabel,
		namePlaceholder: fetched.namePlaceholder ?? d.namePlaceholder,
		mobileLabel: fetched.mobileLabel ?? d.mobileLabel,
		mobilePlaceholder: fetched.mobilePlaceholder ?? d.mobilePlaceholder,
		emailLabel: fetched.emailLabel ?? d.emailLabel,
		emailPlaceholder: fetched.emailPlaceholder ?? d.emailPlaceholder,
		messageLabel: fetched.messageLabel ?? d.messageLabel,
		messagePlaceholder: fetched.messagePlaceholder ?? d.messagePlaceholder,
		submitLabel: fetched.submitLabel ?? d.submitLabel,
		footnote: fetched.footnote ?? d.footnote,
	};
}

export function mergeLayoutSingletonsBundle(raw: LayoutSingletonsBundle | null | undefined): {
	site: SiteSettingsDoc;
	disclaimer: DisclaimerSettingsDoc;
	contactForm: ContactFormSettingsDoc;
} {
	return {
		site: mergeSiteSettings(raw?.site ?? null),
		disclaimer: mergeDisclaimerSettings(raw?.disclaimer ?? null),
		contactForm: mergeContactFormSettings(raw?.contactForm ?? null),
	};
}
