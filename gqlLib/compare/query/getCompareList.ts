import { gql } from "@apollo/client";

const GET_COMPARE_LIST = gql`
  query GetCompareList($userId: String!) {
    getCompareList(userId: $userId) {
      datePublished
      name
      recipeIngredients
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
          ingredientName
          _id
        }
        selectedPortion {
          name
          quantity
          gram
        }
        portions {
          name
          gram
          default
        }
      }
      notes
      addedToCompare
      userCollections
      defaultVersion {
        postfixTitle
        _id
      }
      isMatch
    }
  }
`;
export default GET_COMPARE_LIST;
