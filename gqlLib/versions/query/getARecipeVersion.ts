import { gql } from "@apollo/client";

const GET_A_RECIPE_VERSION = gql`
  query GetARecipeVersion($versionId: String!) {
    getARecipeVersion(versionId: $versionId) {
      _id
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
      servingSize
    }
  }
`;

export default GET_A_RECIPE_VERSION;
