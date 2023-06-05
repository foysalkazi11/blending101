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
      datePublished
      name
      recipeIngredients
      recipeBlendCategory {
        name
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
        weightInGram
        portions {
          name
          quantity
          default
          gram
        }
        selectedPortion {
          name
          quantity
          gram
        }
      }
      notes
      addedToCompare
      defaultVersion {
        _id
        postfixTitle
        ingredients {
          ingredientId {
            _id
            ingredientName
          }
          comment
        }
        description
        calorie {
          value
        }
        gigl {
          netCarbs
        }
      }
    }
  }
`;

export default CREATE_A_RECIPE_BY_USER;
