import { gql } from '@apollo/client';

const EDIT_INGREDIENT_WIKI = gql`
  mutation Mutation($data: EditIngredientAndNutrientInWiki!) {
    editIngredientWiki(data: $data)
  }
`;

export default EDIT_INGREDIENT_WIKI;
