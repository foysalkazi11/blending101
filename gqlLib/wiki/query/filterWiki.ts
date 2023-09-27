import { gql } from "@apollo/client";

const FILTER_WIKI = gql`
  query FilterWiki($userId: String!, $data: FilterWikiInput!, $limit: Float, $page: Float) {
    filterWiki(userId: $userId, data: $data, limit: $limit, page: $page) {
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
`;

export default FILTER_WIKI;
