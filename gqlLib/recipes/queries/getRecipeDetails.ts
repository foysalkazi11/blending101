import { gql } from "@apollo/client";

export const GET_RECIPE = gql`
  query GetARecipe($recipeId: String!, $userId: String) {
    getARecipe(recipeId: $recipeId, userId: $userId) {
      userId {
        _id
        displayName
        image
      }
      _id
      name
      prepTime
      description
      recipeIngredients
      recipeInstructions
      totalRating
      numberOfRating
      averageRating
      numberOfRating
      totalViews
      recipeBlendCategory {
        name
        _id
      }

      image {
        image
        default
      }
      servingSize
      addedToCompare
      notes
      servings
      recipeVersion {
        _id
        postfixTitle
        description
        createdAt
        editedAt
        isDefault
        isOriginal
      }
      userCollections
      defaultVersion {
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
      originalVersion {
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

export const GET_A_RECIPE_FOR_EDIT_RECIPE = gql`
  query GetARecipe($recipeId: String!, $userId: String!) {
    getARecipe(recipeId: $recipeId, userId: $userId) {
      _id
      name
      prepTime
      description
      recipeIngredients
      recipeInstructions
      totalRating
      numberOfRating
      averageRating
      numberOfRating
      totalViews
      recipeBlendCategory {
        name
      }
      ingredients {
        ingredientId {
          ingredientName
          _id
        }

        portions {
          name
          gram
          default
        }
      }
      image {
        image
        default
      }
    }
  }
`;

export const GET_NUTRITION = (ingredients) => {
  const convertArrToString = (arr) => {
    arr = arr?.map((itm) => {
      return `
            {
              ingredientId: "${itm.ingredientId._id}",
              value: ${itm.selectedPortion.gram}
            }
          `;
    });
    arr = `[${arr?.toString()}]`;
    return arr;
  };
  return gql`
    query {
      getBlendNutritionBasedOnRecipexxx(
        ingredientsInfo: ${convertArrToString(ingredients)}
      )
    }
  `;
};
