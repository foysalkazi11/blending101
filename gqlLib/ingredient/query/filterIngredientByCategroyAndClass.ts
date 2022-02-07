import { gql } from "@apollo/client";

const FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS = gql`
  query Query($data: IngredientFilter!) {
    filterIngredientByCategoryAndClass(data: $data) {
      _id
      ingredientName
      featuredImage
      images
      category
    }
  }
`;
export default FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS;
