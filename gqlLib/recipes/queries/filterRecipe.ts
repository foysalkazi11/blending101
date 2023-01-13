import { gql } from "@apollo/client";

const FILTER_RECIPE = gql`
  query FilterRecipe($data: FilterRecipe!, $page: Float, $limit: Float) {
    filterRecipe(data: $data, page: $page, limit: $limit) {
      recipes {
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
        recipeVersion {
          _id
          isDefault
          isOriginal
          postfixTitle
          description
        }
      }
      totalRecipes
    }
  }
`;

export default FILTER_RECIPE;
