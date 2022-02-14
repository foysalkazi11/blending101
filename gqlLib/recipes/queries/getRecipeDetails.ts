import { gql } from "@apollo/client";

export const GET_RECIPE = gql`
  query GetARecipe($recipeId: String!) {
    getARecipe(recipeId: $recipeId) {
      name
      prepTime
      description
      recipeIngredients
      recipeInstructions
      recipeBlendCategory {
        name
      }
      ingredients {
        selectedPortion {
          name
          quantity
          gram
        }
      }
      image {
        image
        default
      }
    }
  }
`;
