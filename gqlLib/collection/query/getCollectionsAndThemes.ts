import { gql } from "@apollo/client";

const GET_COLLECTIONS_AND_THEMES = gql`
  query GetUserCollectionsAndThemes($userId: String!) {
    getUserCollectionsAndThemes(userId: $userId) {
      collections {
        name
        slug
        recipes
        image
      }
    }
  }
`;

export default GET_COLLECTIONS_AND_THEMES;
