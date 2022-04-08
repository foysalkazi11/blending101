import { gql } from '@apollo/client';

const GET_WIKI_LIST = gql`
  query GetWikiList {
    getWikiList {
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
    }
  }
`;

export default GET_WIKI_LIST;
