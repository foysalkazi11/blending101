import { gql } from "@apollo/client";

const FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS_FOR_WIKI = gql`
  query FilterIngredientByCategoryAndClassforWiki($data: IngredientFilter!) {
    filterIngredientByCategoryAndClassForWiki(data: $data) {
      _id
      ingredientName
      category
      blendStatus
      classType
      description
      images
      featuredImage
      portions {
        measurement
        meausermentWeight
        default
      }
    }
  }
`;
export default FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS_FOR_WIKI;
