import { gql } from "@apollo/client";

const GET_ALL_BLOG_COLLECTIONS = gql`
  query GetAllBlogCollections($memberId: String!) {
    getAllBlogCollections(memberId: $memberId) {
      blogCollections {
        _id
        blogs
        collectionDataCount
        image
        memberId
        name
        slug
      }
      defaultCollection {
        _id
        blogs
        collectionDataCount
        image
        memberId
        name
        slug
      }
    }
  }
`;

export default GET_ALL_BLOG_COLLECTIONS;
