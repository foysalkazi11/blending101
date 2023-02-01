import { gql } from "@apollo/client";

const GET_ALL_POPULAR_RECIPES = gql`
  query GetAllpopularRecipes($userId: String!) {
    getAllpopularRecipes(userId: $userId) {
      datePublished
      name
      recipeIngredients
      recipeBlendCategory {
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
      userCollections
      defaultVersion {
        _id
        postfixTitle
      }
      isMatch
      userId {
        _id
        displayName
        image
      }
      recipeVersion {
        _id
        isDefault
        isOriginal
        postfixTitle
        description
      }
    }
  }
`;

export default GET_ALL_POPULAR_RECIPES;
