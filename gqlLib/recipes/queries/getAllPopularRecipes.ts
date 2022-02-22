import { gql } from "@apollo/client";

const GET_ALL_POPULAR_RECIPES = gql`
  query Query {
    getAllpopularRecipes {
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
    }
  }
`;

export default GET_ALL_POPULAR_RECIPES;
