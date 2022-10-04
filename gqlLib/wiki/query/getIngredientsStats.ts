import { gql } from "@apollo/client";

const GET_INGREDIENT_STATS = gql`
  query TestGetIngredientsStats(
    $ingredientId: String!
    $memberId: String!
    $currentDate: String!
    $type: String
    $categoy: String
  ) {
    testGetIngredientsStats(
      ingredientId: $ingredientId
      memberId: $memberId
      currentDate: $currentDate
      type: $type
      categoy: $categoy
    ) {
      stats {
        _id
        consumptionInGram
      }
      portion {
        measurement
        meausermentWeight
        default
      }
      otherIngredients {
        _id
        name
        consumptionInGram
        portion {
          measurement
          meausermentWeight
          default
        }
      }
    }
  }
`;

export default GET_INGREDIENT_STATS;
