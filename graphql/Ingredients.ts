import { gql } from "@apollo/client";

export const GET_INGREDIENTS = gql`
  query GetIngredients($classType: String!) {
    filterIngredientByCategoryAndClass(
      data: { ingredientCategory: $classType, IngredientClass: 0 }
    ) {
      value: _id
      label: ingredientName
      portions {
        measurement
        meausermentWeight
        default
      }
    }
  }
`;
