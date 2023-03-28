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
    ) {
      isMatch
      defaultVersion {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
        selectedImage
      }
      turnedOnVersions {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
        selectedImage
      }
      turnedOffVersions {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
        selectedImage
      }
    }
  }
`;

export default CHANGE_DEFAULT_VERSION;
