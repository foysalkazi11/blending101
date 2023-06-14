import { gql } from "@apollo/client";

const GET_NUTRIENT_WIKI_LIST = gql`
  query GetNutrientWikiList2(
    $page: Float
    $limit: Float
    $userId: String
    $ids: [String!]
  ) {
    getNutrientWikiList2(
      page: $page
      limit: $limit
      userId: $userId
      ids: $ids
    ) {
      total
      wikiList {
        _id
        wikiTitle
        wikiDescription
        type
        image
        status
        portions {
          measurement
          meausermentWeight
          default
        }
        publishDate
        description
        isPublished
        hasInCompare
        commentsCount
        author {
          _id
          displayName
          email
          firstName
          lastName
          profilePicture
        }
      }
    }
  }
`;
export default GET_NUTRIENT_WIKI_LIST;
