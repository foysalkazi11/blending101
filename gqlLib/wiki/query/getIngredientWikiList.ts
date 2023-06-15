import { gql } from "@apollo/client";

const GET_INGREDIENT_WIKI_LIST = gql`
  query GetIngredientWikiList2(
    $page: Float
    $limit: Float
    $userId: String
    $ids: [String!]
  ) {
    getIngredientWikiList2(
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
export default GET_INGREDIENT_WIKI_LIST;
