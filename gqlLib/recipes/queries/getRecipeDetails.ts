import { gql } from "@apollo/client";

const GET_A_RECIPE = gql`
  query GetARecipe2($userId: String!, $token: String, $recipeId: String) {
    getARecipe2(userId: $userId, token: $token, recipeId: $recipeId) {
      recipeId {
        _id
        name
        image {
          image
          default
        }
        originalVersion {
          _id
          postfixTitle
        }
        userId {
          _id
          displayName
          image
        }
        brand {
          _id
          brandName
          brandImage
        }
        averageRating
        numberOfRating
        servings
        servingSize
        token
        totalRating
      }
      defaultVersion {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
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
      turnedOnVersions {
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

      turnedOffVersions {
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
      addedToCompare
      allRecipes
      isMatch
      myRecipes
      notes
      userCollections
      versionsCount
    }
  }
`;

export default GET_A_RECIPE;
