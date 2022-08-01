import { gql } from "@apollo/client";

const CREATE_WIKI_COMMENT = gql`
  mutation CreateWikiComment($data: CreateWikiComment!) {
    createWikiComment(data: $data) {
      comment
      type
      entityId
      userId
      createdAt
      updatedAt
    }
  }
`;

export default CREATE_WIKI_COMMENT;
