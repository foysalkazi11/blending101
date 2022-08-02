import { gql } from "@apollo/client";

const EDIT_WIKI_COMMENTS = gql`
  mutation EditWikiComment($data: CreateEditWikiComment!) {
    editWikiComment(data: $data) {
      comment
      updatedAt
    }
  }
`;

export default EDIT_WIKI_COMMENTS;
