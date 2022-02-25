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
        ingredientId {
          ingredientName
          _id
        }
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

export const GET_NUTRITION = (ingredients) => {
  const convertArrToString = (arr) => {
    arr = arr?.map((itm) => {
      return `
            {
              ingredientId: "${itm.ingredientId._id}",
              value: ${itm.selectedPortion.gram}

            }
          `;
    });
    arr = `[${arr?.toString()}]`;
    return arr;
  };
  return gql`
    query {
      getBlendNutritionBasedOnRecipe(
        ingredientsInfo: ${convertArrToString(ingredients)}
      )
    }
  `;
};
