import { gql } from "@apollo/client";

const FILTER_BLOG = gql`
  query FilterBlog($currentDate: String!, $memberId: String!, $data: FilterBlogInput!, $page: Float, $limit: Float) {
    filterBlog(currentDate: $currentDate, memberId: $memberId, data: $data, page: $page, limit: $limit) {
      blogs {
        _id
        coverImage
        mediaLength
        mediaUrl
        publishDate
        slug
        title
        publishDateString
        type
        commentsCount
        blogCollections
        createdBy {
          _id
          displayName
          firstName
          image
          lastName
        }
      }
      totalBlogs
    }
  }
`;

export default FILTER_BLOG;
