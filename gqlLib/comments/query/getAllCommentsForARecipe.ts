import { gql } from "@apollo/client";

const GET_ALL_COMMENTS_FOR_A_RECIPE = gql`
  query Query($getAllCommentsForARecipeData2: GetAllComments!) {
    getAllCommentsForARecipe(data: $getAllCommentsForARecipeData2) {
      userComment {
        _id
        comment
        rating
        createdAt
        updatedAt
      }
      comments {
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
export default GET_ALL_COMMENTS_FOR_A_RECIPE;
