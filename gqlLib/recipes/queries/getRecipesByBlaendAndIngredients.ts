import { gql } from "@apollo/client";

const GET_RECIPES_BY_BLEND_AND_INGREDIENTS = gql`
  query Query($data: GetAllRecipeByBlendCategory!) {
    getAllRecipesByBlendCategory(data: $data) {
      image {
        default
        image
      }
      name
      _id
      description
      prepTime
      cookTime
      totalTime
      recipeYield
      recipeIngredients
      recipeInstructions
      recipeCuisines
      ingredients {
        ingredientId
        portion {
          measurement
          meausermentWeight
        }
      }
      url
      discovery
      favicon
      averageRating
      numberOfRating
      testIngredient {
        quantity
        unit
        name
      }
    }
  }
`;

export default GET_RECIPES_BY_BLEND_AND_INGREDIENTS;
