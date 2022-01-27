import { gql } from "@apollo/client";

const CREATE_NET_COMMENT = gql`
  mutation Mutation($data: CreateComment!) {
    createComment(data: $data) {
      userComment {
        comment
        rating
        createdAt
        updatedAt
        _id
      }
      comments {
        _id
        comment
        rating
        createdAt
        updatedAt
        userId {
          displayName
          firstName
          lastName
          image
        }
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
export default CREATE_NET_COMMENT;
