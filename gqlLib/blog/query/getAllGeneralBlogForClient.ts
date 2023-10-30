import { gql } from "@apollo/client";

const GET_ALL_GENERAL_BLOG_FOR_CLIENT = gql`
  query GetAllGeneralBlogForClient(
    $memberId: String!
    $currentDate: String!
    $categories: [String!]
    $page: Float
    $limit: Float
  ) {
    getAllGeneralBlogForClient(
      memberId: $memberId
      currentDate: $currentDate
      categories: $categories
      page: $page
      limit: $limit
    ) {
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

export default GET_ALL_GENERAL_BLOG_FOR_CLIENT;
