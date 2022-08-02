import { gql } from "@apollo/client";

const REMOVE_WIKI_COMMENT = gql`
  mutation RemoveAWikiComment($userId: String!, $entityId: String!) {
    removeAWikiComment(userId: $userId, entityId: $entityId)
  }
`;

export default REMOVE_WIKI_COMMENT;
