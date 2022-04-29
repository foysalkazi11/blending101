import { gql } from "@apollo/client";

const CREATE_A_RECIPE_BY_USER = gql`
  mutation AddRecipeFromUser($data: CreateRecipe!) {
    addRecipeFromUser(data: $data) {
      _id
    }
  }
`;

export default CREATE_A_RECIPE_BY_USER;
