import { gql } from "@apollo/client";

const REMOVE_A_RECIPE_VERSION = gql`
  mutation RemoveARecipeVersion($versionId: String!) {
    removeARecipeVersion(versionId: $versionId) {
      _id
      postfixTitle
      description
      createdAt
      editedAt
      isDefault
      isOriginal
    }
  }
`;
export default REMOVE_A_RECIPE_VERSION;
