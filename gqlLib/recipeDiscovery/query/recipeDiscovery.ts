import { gql } from "@apollo/client";

export const GET_ALL_INGREDIENTS_DATA_BASED_ON_NUTRITION = (
  nutritionID,
  selectedCategory
) => gql`
  query {
    getAllIngredientsDataBasedOnNutrition(
      data: { nutritionID: "${nutritionID}", category: "${selectedCategory}" }
    ) {
      ingredientId
      name
      value
      units
    }
  }
`;

export const GET_DAILY_BY_USER_ID = (userId) => gql`
  query {
    getDailyByUserId(userId: "${userId}") {
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
        }
        Minerals {
          nutrientName
          data {
            value
            units
          }
        }
        Vitamins {
          nutrientName
          data {
            value
            units
          }
        }
      }
    }
  }
`;

export const GET_ALL_BLEND_NUTRIENTS =  gql`
  query {
    getAllBlendNutrients {
      _id
      nutrientName
    }
  }
`;
