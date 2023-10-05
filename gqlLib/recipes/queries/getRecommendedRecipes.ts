import { gql } from "@apollo/client";

const GET_ALL_RECOMMENDED_RECIPES = gql`
  query GetAllrecomendedRecipes2(
    $userId: String!
    $page: Float
    $limit: Float
  ) {
    getAllrecomendedRecipes2(userId: $userId, page: $page, limit: $limit) {
      recipes {
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
          recipeBlendCategory {
            _id
            name
          }
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
      totalRecipes
    }
  }
`;

export default GET_ALL_RECOMMENDED_RECIPES;
