import { gql } from "@apollo/client";

const FILTER_RECIPE = gql`
  query FilterRecipe($data: FilterRecipe!) {
    filterRecipe(data: $data) {
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
        postfixTitle
      }
      isMatch
      userId {
        _id
        displayName
        image
      }
    }
  }
`;

export default FILTER_RECIPE;
