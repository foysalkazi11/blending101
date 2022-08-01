import { gql } from "@apollo/client";

const GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY = gql`
  query GetAllWikiCommentsForAWikiEntity($entityId: String!) {
    getAllWikiCommentsForAWikiEntity(entityId: $entityId) {
      comment
      type
      entityId
      userId
      createdAt
      updatedAt
    }
  }
`;

export default GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY;
