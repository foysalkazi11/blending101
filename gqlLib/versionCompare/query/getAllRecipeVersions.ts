import { gql } from "@apollo/client";

const GET_ALL_RECIPE_VERSION = gql`
  query GetAllVersions($recipeId: String!, $userId: String!) {
    getAllVersions(recipeId: $recipeId, userId: $userId) {
      _id
      name
      recipeIngredients
      recipeBlendCategory {
        name
        _id
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

      isMatch
      userId {
        _id
        displayName
        image
      }
      recipeVersion {
        _id
        servingSize
        recipeId
        recipeInstructions
        postfixTitle
        description
        ingredients {
          ingredientId {
            ingredientName
            _id
            images
            featuredImage
          }

          portions {
            name
            gram
            default
            quantity
          }
          weightInGram
          selectedPortion {
            name
            quantity
            gram
          }
        }
      }
    }
  }
`;

export default GET_ALL_RECIPE_VERSION;
