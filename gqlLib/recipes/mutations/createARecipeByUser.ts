import { gql } from "@apollo/client";

const CREATE_A_RECIPE_BY_USER = gql`
  mutation AddRecipeFromUser(
    $isAddToTemporaryCompareList: Boolean!
    $data: xCreateRecipe!
  ) {
    addRecipeFromUser(
      isAddToTemporaryCompareList: $isAddToTemporaryCompareList
      data: $data
    ) {
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
        servings
        servingSize
        token
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
          selectedImage
        }
      }
      defaultVersion {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
        errorIngredients {
          errorString
          errorIngredientId: ingredientId
          qaId
        }
        ingredients {
          comment
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
        selectedImage
        gigl {
          netCarbs
          totalGL
          totalGi
        }
        calorie {
          value
        }
      }
      addedToCompare
      allRecipes
      isMatch
      myRecipes
      notes
      userCollections
      versionsCount
      personalRating
    }
  }
`;

export default CREATE_A_RECIPE_BY_USER;
