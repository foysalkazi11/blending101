import { gql } from "@apollo/client";

const EDIT_COMMENT = gql`
  mutation EditComment($data: EditComment!) {
    editComment(data: $data) {
      comments {
        _id
        comment
        rating
        updatedAt
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
