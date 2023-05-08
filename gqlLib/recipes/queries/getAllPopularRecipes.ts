import { gql } from "@apollo/client";

const GET_ALL_POPULAR_RECIPES = gql`
  query GetAllpopularRecipes2($userId: String!) {
    getAllpopularRecipes2(userId: $userId) {
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
        averageRating
        numberOfRating
      }
      defaultVersion {
        _id
        postfixTitle
        ingredients {
          ingredientId {
            _id
            ingredientName
          }
        }
        description
      }
      isMatch
      allRecipes
      myRecipes
      notes
      addedToCompare
      userCollections
      versionCount
      calorie
      netCarbs
      rxScore
    }
  }
`;

export default GET_ALL_POPULAR_RECIPES;
