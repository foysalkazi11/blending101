import { gql } from "@apollo/client";

export const GET_RECIPE = gql`
  query GetARecipe($recipeId: String!) {
    getARecipe(recipeId: $recipeId) {
    name
    prepTime
    description
    recipeIngredients
    recipeInstructions
    totalRating
    numberOfRating
    averageRating
    numberOfRating
    totalViews
    recipeBlendCategory {
      name
    }
    ingredients {
      ingredientId
      selectedPortion {
        name
        quantity
        gram
      }
      portions {
        name
        gram
        default
      }
    }
    image {
      image
      default
    }
    }
  }
`;
