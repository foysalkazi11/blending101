import { gql } from "@apollo/client";

const GET_MY_RECENT_RECIPES = gql`
  query GetMyRecentRecipes($userId: String!, $limit: Float, $page: Float) {
    getMyRecentRecipes(userId: $userId, limit: $limit, page: $page) {
      _id
      creatorInfo {
        _id
        displayName
        email
        firstName
        image
        lastName
      }
      description
      image
      name
      slug
      accepted
      totalRecipes
      recipes {
        addedToCompare
        allRecipes
        isMatch
        myRecipes
        notes
        userCollections
        versionCount
        defaultVersion {
          _id
          description
          postfixTitle
          recipeId
          recipeInstructions
          servingSize
          calorie {
            value
          }
          gigl {
            netCarbs
          }
          ingredients {
            ingredientId {
              ingredientName
              _id
            }
          }
        }
        recipeId {
          _id
          name
          image {
            image
            default
          }
          userId {
            _id
            displayName
            image
            lastName
            firstName
            email
          }
          brand {
            _id
            brandName
            brandImage
          }
          url
          averageRating
          numberOfRating
          servings
          servingSize
          totalRating
          description
          recipeBlendCategory {
            _id
            name
          }
          originalVersion {
            _id
            description
            postfixTitle
            servingSize
            recipeInstructions
            recipeId
          }
        }
      }
    }
  }
`;

export default GET_MY_RECENT_RECIPES;
