import { gql } from "@apollo/client";

const CHANGE_DEFAULT_VERSION = gql`
  mutation ChangeDefaultVersion(
    $userId: String!
    $recipeId: String!
    $versionId: String!
  ) {
    changeDefaultVersion(
      userId: $userId
      recipeId: $recipeId
      versionID: $versionId
    ) {
      _id
      description
      postfixTitle
      recipeId
      recipeInstructions
      servingSize
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
`;

export default CHANGE_DEFAULT_VERSION;
