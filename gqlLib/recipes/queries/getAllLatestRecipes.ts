import { gql } from "@apollo/client";

const GET_ALL_LATEST_RECIPES = gql`
  query GetAllLatestRecipes($userId: String!) {
    getAllLatestRecipes(userId: $userId) {
      datePublished
      name
      recipeIngredients
      recipeBlendCategory {
        name
      }
      testIngredient {
        quantity
        unit
        name
      }
      image {
        image
        default
      }
      description
      prepTime
      cookTime
      totalTime
      _id
      url
      favicon
      averageRating
      numberOfRating
      ingredients {
        ingredientId {
          _id
          ingredientName
        }
      }
      notes
      addedToCompare
    }
  }
`;

export default GET_ALL_LATEST_RECIPES;
