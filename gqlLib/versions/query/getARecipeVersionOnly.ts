import { gql } from "@apollo/client";

const GET_A_RECIPE_VERSION_ONLY = gql`
  query GetARecipeVersionOnly($recipeId: String!, $userId: String) {
    getARecipe(recipeId: $recipeId, userId: $userId) {
      recipeVersion {
        _id
        postfixTitle
        description
        createdAt
        editedAt
      }
    }
  }
`;

export default GET_A_RECIPE_VERSION_ONLY;
