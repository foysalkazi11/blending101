import { gql } from "@apollo/client";

const GET_DAILY_BY_USER_ID = gql`
  query GetDailyByUserId($userId: String!) {
    getDailyByUserId(userId: $userId) {
      query Query($userId: String!) {
  getDailyByUserId(userId: $userId) {
    bmi {
      value
      units
    }
    calories {
      value
      units
    }
    nutrients {
      Energy {
        percentage
        showPercentage
        blendNutrientRef
        data {
          units
          value
        }
        nutrientName
      }
      Minerals {
        nutrientName
        data {
          units
          value
        }
        blendNutrientRef
        showPercentage
        percentage
      }
      Vitamins {
        nutrientName
        data {
          value
          units
        }
        blendNutrientRef
        showPercentage
        percentage
      }
    }
  }
}
    }
  }
`;

export default GET_DAILY_BY_USER_ID;
