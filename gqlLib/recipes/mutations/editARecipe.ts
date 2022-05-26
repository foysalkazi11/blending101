import { gql } from "@apollo/client";

const EDIT_A_RECIPE = gql`
  mutation EditARecipe($data: EditRecipe!) {
    editARecipe(data: $data)
  }
`;

export default EDIT_A_RECIPE;
