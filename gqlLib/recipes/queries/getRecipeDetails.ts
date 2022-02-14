import { gql } from "@apollo/client";

export const GET_RECIPE = gql`
  query GetARecipe($recipeId: String!) {
    getARecipe(recipeId: $recipeId) {
      name
      prepTime
      description
      image {
        image
        default
      }
    }
  }
`;
