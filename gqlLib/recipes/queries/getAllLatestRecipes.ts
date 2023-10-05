import { gql } from "@apollo/client";

export const RECIPE_FIELDS = gql`
  fragment RecipeFields on ProfileRecipe {
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
`;

const GET_ALL_LATEST_RECIPES = gql`
  query GetAllLatestRecipes2($userId: String!, $page: Float, $limit: Float) {
    getAllLatestRecipes2(userId: $userId, page: $page, limit: $limit) {
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

export default GET_ALL_LATEST_RECIPES;
