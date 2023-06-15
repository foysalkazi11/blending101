import { gql } from "@apollo/client";

const GET_ALL_LATEST_RECIPES = gql`
  query GetAllLatestRecipes2($userId: String!) {
    getAllLatestRecipes2(userId: $userId) {
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
          firstName
          lastName
        }
        brand {
          _id
          brandName
          brandImage
        }
        url
        averageRating
        numberOfRating
      }
      defaultVersion {
        _id
        postfixTitle
        errorIngredients {
          errorString
          errorIngredientId: ingredientId
          qaId
        }
        ingredients {
          comment
          ingredientId {
            _id
            ingredientName
          }
        }
        description
        calorie {
          value
        }
        gigl {
          netCarbs
        }
      }
      isMatch
      allRecipes
      myRecipes
      notes
      addedToCompare
      userCollections
      versionCount
      personalRating
    }
  }
`;

export default GET_ALL_LATEST_RECIPES;
