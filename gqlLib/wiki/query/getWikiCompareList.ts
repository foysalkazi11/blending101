import { gql } from "@apollo/client";

const GET_WIKI_COMPARE_LIST = gql`
  query GetWikiCompareList($userId: String!) {
    getWikiCompareList(userId: $userId) {
      _id
      category
      portion {
        default
        meausermentWeight
        measurement
      }
      featuredImage
      wikiTitle
      wikiDescription
      type
      image
      publishedBy
      commentsCount
      hasInCompare
    }
  }
`;

export default GET_WIKI_COMPARE_LIST;
