import { gql } from "@apollo/client";

const GET_ALL_INGREDIENTS_BASED_ON_NURTITION = gql`
  query GetAllIngredientsBasedOnNutrition2($userId: String!, $data: GetIngredientsFromNutrition!) {
    getAllIngredientsBasedOnNutrition2(userId: $userId, data: $data) {
      wikiTitle
      wikiDescription
      wikiCoverImages
      wikiFeatureImage
      bodies
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
      type
      category
      publishedBy
      isPublished
      commentsCount
      nutrientBookmarkList {
        nutrientId {
          _id
          nutrientName
        }
        customBookmarkName
        link
        active
      }
      author {
        _id
        displayName
        firstName
        lastName
        profilePicture
        email
      }
      relatedWikis {
        wikiList {
          _id
          category
          collections
          commentsCount
          description
          hasInCompare
          image
          isPublished
          portions {
            measurement
            meausermentWeight
            default
          }
          status
          type
          wikiDescription
          wikiTitle
        }
        total
      }
    }
  }
`;

export default GET_ALL_INGREDIENTS_BASED_ON_NURTITION;
