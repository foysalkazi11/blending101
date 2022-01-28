import { gql } from "@apollo/client";

const DELETE_COMMENT = gql`
  mutation Mutation($data: RemoveCommentInput!) {
    removeComment(data: $data) {
      userComment {
        updatedAt
        createdAt
        rating
        comment
        _id
      }
      recipe {
        _id
        averageRating
        numberOfRating
      }
    }
  }
`;
export default DELETE_COMMENT;
