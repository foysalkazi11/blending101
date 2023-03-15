import { gql } from "@apollo/client";

const CHANGE_DEFAULT_VERSION = gql`
  mutation ChangeDefaultVersion(
    $userId: String!
    $recipeId: String!
    $versionId: String!
    $isTurnedOff: Boolean
  ) {
    changeDefaultVersion(
      userId: $userId
      recipeId: $recipeId
      versionID: $versionId
      isTurnedOff: $isTurnedOff
    )
  }
`;

export default CHANGE_DEFAULT_VERSION;
