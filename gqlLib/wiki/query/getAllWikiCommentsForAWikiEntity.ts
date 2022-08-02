import { gql } from "@apollo/client";

const GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY = gql`
  query GetAllWikiCommentsForAWikiEntity($userId: String!, $entityId: String!) {
    getAllWikiCommentsForAWikiEntity(userId: $userId, entityId: $entityId) {
      userComment {
        comment
        type
        entityId
        createdAt
        updatedAt
      }
      comments {
        comment
        type
        entityId
        createdAt
        updatedAt
        userId {
          displayName
          firstName
          lastName
          image
          email
        }
      }
    }
  }
`;

export default GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY;
