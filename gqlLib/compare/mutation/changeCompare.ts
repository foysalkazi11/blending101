import { gql } from "@apollo/client";

const CHANGE_COMPARE = gql`
  mutation ChangeCompare(
    $versionId: String!
    $userId: String!
    $recipeId: String!
  ) {
    changeCompare(versionId: $versionId, userId: $userId, recipeId: $recipeId)
  }
`;

export default CHANGE_COMPARE;
