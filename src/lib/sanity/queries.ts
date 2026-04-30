const imageProjection = `{
  ...,
  asset->{
    _id,
    _ref,
    url,
    metadata { dimensions { width, height } }
  }
}`;

export const blogPostsListQuery = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    updatedAt,
    author,
    "heroImage": heroImage ${imageProjection}
  }
`;

export const blogPostBySlugQuery = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    updatedAt,
    author,
    body,
    "heroImage": heroImage ${imageProjection}
  }
`;

export const practiceAreasListQuery = /* groq */ `
  *[_type == "practiceArea" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    order,
    "icon": icon ${imageProjection}
  }
`;

export const practiceAreaBySlugQuery = /* groq */ `
  *[_type == "practiceArea" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    order,
    body,
    "icon": icon ${imageProjection}
  }
`;

/** Fetch order is arbitrary; pages must sort via `sortTeamMembersForListing` / `sortTeamMembersForHomeCarousel`. */
export const teamMembersListQuery = /* groq */ `
  *[_type == "teamMember" && defined(slug.current)] {
    _id,
    name,
    "slug": slug.current,
    role,
    profilePdf,
    "photo": photo ${imageProjection}
  }
`;

export const countsByTypeQuery = /* groq */ `{
  "blogPost": count(*[_type == "blogPost"]),
  "practiceArea": count(*[_type == "practiceArea"]),
  "teamMember": count(*[_type == "teamMember"]),
  "jobPage": count(*[_type == "jobPage"])
}`;

/** Lightweight fetch for RSS, blog cards, and page titles where full layout bundle isn’t needed. */
export const siteSettingsCompactQuery = /* groq */ `
  *[_id == "siteSettings"][0]{
    _id,
    siteTitle,
    siteDescription,
    contactEmail,
    offices[]{ _key, label, street, city, phone, mapEmbedUrl, mapIframeTitle },
    blogAuthorFallback,
    blogReadMoreLabel,
    practiceAreaCtaLabel
  }
`;

export const layoutSingletonsBundleQuery = /* groq */ `{
  "site": *[_id == "siteSettings"][0]{
    _id,
    siteTitle,
    siteDescription,
    navLinks[]{ _key, label, href },
    contactEmail,
    offices[]{ _key, label, street, city, phone, mapEmbedUrl, mapIframeTitle },
    footerTagline,
    footerNavigateHeading,
    footerOfficesHeading,
    footerContactHeading,
    headerHomeAriaLabel,
    mobileMenuHomeLabel,
    blogAuthorFallback,
    blogReadMoreLabel,
    practiceAreaCtaLabel
  },
  "disclaimer": *[_id == "disclaimerSettings"][0]{
    _id,
    title,
    bullets[]{ _key, text },
    acceptButtonLabel
  }
}`;

export const homePageQuery = /* groq */ `
  *[_id == "homePage"][0]{
    _id,
    heroTitle,
    heroSubtitle,
    heroCtaLabel,
    heroCtaHref,
    founderHeading,
    founderBody,
    founderSignature,
    founderCtaLabel,
    founderCtaHref,
    "founderImage": founderImage ${imageProjection},
    practiceAreasHeading,
    practiceAreasIntro,
    practiceAreasViewAllLabel,
    teamHeading,
    teamMeetFullLabel,
    blogsHeading,
    blogsAllArticlesLabel,
    contactSectionHeading
  }
`;

export const aboutPageQuery = /* groq */ `
  *[_id == "aboutPage"][0]{
    _id,
    sections[]{ _key, heading, body },
    practiceAreasCtaLabel,
    practiceAreasCtaHref,
    contactSectionHeading
  }
`;

export const contactPageQuery = /* groq */ `
  *[_id == "contactPage"][0]{
    _id,
    heroTitle,
    heroSubtitle,
    emailSectionHeading,
    contactFormSectionHeading,
    internshipsHeading,
    internshipsBody,
    internshipsCtaLabel,
    internshipsCtaHref
  }
`;

export const jobPagesListQuery = /* groq */ `
  *[_type == "jobPage" && defined(slug.current) && published != false] | order(sortOrder asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    published,
    sortOrder
  }
`;

export const jobPageBySlugQuery = /* groq */ `
  *[_type == "jobPage" && slug.current == $slug && published != false][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    published,
    sortOrder,
    body,
    howToApplyHeading,
    howToApplyBody
  }
`;
