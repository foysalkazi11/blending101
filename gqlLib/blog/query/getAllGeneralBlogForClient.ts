import { gql } from "@apollo/client";

const GET_ALL_GENERAL_BLOG_FOR_CLIENT = gql`
  query GetAllGeneralBlogForClient($memberId: String!, $currentDate: String!) {
    getAllGeneralBlogForClient(memberId: $memberId, currentDate: $currentDate) {
      _id
      coverImage
      createdBy
      hasInCollection
      mediaLength
      mediaUrl
      publishDate
      slug
      title
      publishDateString
      type
      commentsCount
    }
  }
`;

export default GET_ALL_GENERAL_BLOG_FOR_CLIENT;
