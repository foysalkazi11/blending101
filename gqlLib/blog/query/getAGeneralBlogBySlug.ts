import { gql } from "@apollo/client";

const GET_A_GENERAL_BLOG_BY_SLUG = gql`
  query GetAgeneralBlogBySlug($memberId: ID!, $slug: String!) {
    getAgeneralBlogBySlug(memberId: $memberId, slug: $slug) {
      _id
      title
      body
      commentsCount
      coverImage
      type
      slug
      publishDateString
      publishDate
      mediaUrl
      mediaLength
      keywords
      hasInCollection
      description
      createdBy
      category
    }
  }
`;

export default GET_A_GENERAL_BLOG_BY_SLUG;
