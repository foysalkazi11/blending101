import { gql } from "@apollo/client";

const GET_NUTRIENT_WIKI_LIST = gql`
  query GetNutrientWikiList($page: Float, $limit: Float, $userId: String) {
    getNutrientWikiList(page: $page, limit: $limit, userId: $userId) {
      total
      wikiList {
        _id
        wikiTitle
        wikiDescription
        type
        category
        image
        status
        portions {
          measurement
          meausermentWeight
          default
        }
        publishDate
        description
        publishedBy
        isPublished
        hasInCompare
        commentsCount
      }
    }
  }
`;
export default GET_NUTRIENT_WIKI_LIST;
