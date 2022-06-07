import { gql } from "@apollo/client";

const GET_USER_COLLECTIONS_AND_THEMES = gql`
  query GetUserCollectionsAndThemes($userId: String!) {
    getUserCollectionsAndThemes(userId: $userId) {
      collections {
        _id
        name
        recipes
        image
      }
    }
  }
`;
