import { gql } from "@apollo/client";

const GET_ALL_RECIPES_WITHIN_COLLECTIONS = gql`
  query GetAllRecipesFromCollection($userEmail: String!) {
    getAllRecipesFromCollection(userEmail: $userEmail) {
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
      url
      discovery
      favicon
      averageRating
      numberOfRating
      ingredients {
        ingredientId {
          _id
          ingredientName
        }
      }
    }
  }
`;

export default GET_ALL_RECIPES_WITHIN_COLLECTIONS;
