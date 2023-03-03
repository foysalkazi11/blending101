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
    )
  }
`;

export default CHANGE_DEFAULT_VERSION;
