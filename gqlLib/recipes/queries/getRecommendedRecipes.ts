import { gql } from "@apollo/client";

const GET_ALL_RECOMMENDED_RECIPES = gql`
  query GetAllrecomendedRecipes2($userId: String!) {
    getAllrecomendedRecipes2(userId: $userId) {
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

export default GET_ALL_RECOMMENDED_RECIPES;
