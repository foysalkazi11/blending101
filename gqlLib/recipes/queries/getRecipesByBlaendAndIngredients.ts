import { gql } from "@apollo/client";

const GET_RECIPES_BY_BLEND_AND_INGREDIENTS = gql`
  query Query($data: GetAllRecipeByBlendCategory!) {
    getAllRecipesByBlendCategory(data: $data) {
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
      }
      notes
      addedToCompare
      userCollections
      defaultVersion {
        _id
        postfixTitle
      }
      isMatch
      recipeVersion {
        _id
        isDefault
        isOriginal
        postfixTitle
        description
      }
    }
  }
`;

export default GET_RECIPES_BY_BLEND_AND_INGREDIENTS;
