import { gql } from "@apollo/client";

const CHANGE_DEFAULT_VERSION = gql`
  mutation ChangeDefaultVersion($recipeId: String!, $versionId: String!) {
    changeDefaultVersion(recipeId: $recipeId, versionID: $versionId) {
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

export default CHANGE_DEFAULT_VERSION;
