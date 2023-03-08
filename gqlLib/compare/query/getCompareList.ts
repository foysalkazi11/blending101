import { gql } from "@apollo/client";

const GET_COMPARE_LIST = gql`
  query GetCompareList2($userId: String!) {
    getCompareList2(userId: $userId) {
      addedToCompare
      isMatch
      notes
      userCollections
      versionCount
      defaultVersion {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
        ingredients {
          ingredientId {
            ingredientName
            _id
            images
            featuredImage
          }

          portions {
            name
            gram
            default
            quantity
          }
          weightInGram
          selectedPortion {
            name
            quantity
            gram
          }
        }
      }
      recipeId {
        _id
        name
        image {
          image
          default
        }
        userId {
          _id
          displayName
          image
        }
        brand {
          _id
          brandName
          brandImage
        }
        averageRating
        numberOfRating
        servings
        servingSize
        totalRating
        description
        recipeBlendCategory {
          _id
          name
        }
        originalVersion {
          _id
          description
          postfixTitle
          servingSize
          recipeInstructions
          recipeId
        }
      }
    }
  }
`;
export default GET_COMPARE_LIST;
