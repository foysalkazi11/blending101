import { gql } from "@apollo/client";

const EDIT_COMMENT = gql`
  mutation EditComment($editCommentData2: EditComment!) {
    editComment(data: $editCommentData2) {
      userComment {
        comment
        rating
        createdAt
        updatedAt
        _id
      }
      recipe {
        _id
        averageRating
        totalRating
        numberOfRating
      }
    }
  }
`;
export default EDIT_COMMENT;
