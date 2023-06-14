import { gql } from "@apollo/client";

const GET_ONLY_INGREDIENTS_BASED_ON_NURTITION = gql`
  query GetAllIngredientsBasedOnNutrition2(
    $data: GetIngredientsFromNutrition!
    $userId: String
  ) {
    getAllIngredientsBasedOnNutrition2(data: $data, userId: $userId) {
      ingredients {
        portion {
          measurement
          default
          meausermentWeight
        }
        ingredientId
        name
        value
        units
      }
    }
  }
`;

export default GET_ONLY_INGREDIENTS_BASED_ON_NURTITION;
