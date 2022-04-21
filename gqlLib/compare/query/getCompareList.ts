import { gql } from "@apollo/client";

const GET_COMPARE_LIST = gql`
  query GetCompareList($userId: String!) {
    getCompareList(userId: $userId) {
      datePublished
      name
      recipeIngredients
      testIngredient {
        quantity
        unit
        name
      }
      image {
        image
        default
      }
      description
      prepTime
      cookTime
      totalTime
      _id
      url
      favicon
      averageRating
      numberOfRating
      ingredients {
        ingredientId {
          _id
          ingredientName
        }
      }
      notes
      addedToCompare
    }
  }
`;
export default GET_COMPARE_LIST;
