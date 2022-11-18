import { gql } from "@apollo/client";

const SEARCH_RECIPE = gql`
  query SearchRecipes($userId: String!, $searchTerm: String!) {
    searchRecipes(userId: $userId, searchTerm: $searchTerm) {
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

export default SEARCH_RECIPE;
