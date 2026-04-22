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

export const teamMembersListQuery = /* groq */ `
  *[_type == "teamMember" && defined(slug.current)] | order(sortOrder asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    sortOrder,
    profilePdf,
    "photo": photo ${imageProjection}
  }
`;

export const countsByTypeQuery = /* groq */ `{
  "blogPost": count(*[_type == "blogPost"]),
  "practiceArea": count(*[_type == "practiceArea"]),
  "teamMember": count(*[_type == "teamMember"])
}`;
