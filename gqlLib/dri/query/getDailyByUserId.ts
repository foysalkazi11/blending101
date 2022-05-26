import { gql } from "@apollo/client";

const GET_DAILY_BY_USER_ID = gql`
  query GetDailyByUserId($userId: String!) {
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
          nutrientName
          data {
            value
            units
          }
          blendNutrientRef
        }
        Minerals {
          nutrientName
          data {
            value
            units
          }
          blendNutrientRef
        }
        Vitamins {
          nutrientName
          data {
            value
            units
          }
          blendNutrientRef
        }
      }
    }
  }
`;

export default GET_DAILY_BY_USER_ID;
