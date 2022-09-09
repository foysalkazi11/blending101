import { gql } from "@apollo/client";

const GET_ALL_RECOMMENDED_RECIPES = gql`
  query GetAllrecomendedRecipes($userId: String!) {
    getAllrecomendedRecipes(userId: $userId) {
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
        postfixTitle
      }
      isMatch
      userId {
        _id
        displayName
        image
      }
    }
  }
`;

export default GET_ALL_RECOMMENDED_RECIPES;
