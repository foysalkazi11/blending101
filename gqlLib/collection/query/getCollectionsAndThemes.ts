import { gql } from "@apollo/client";

const GET_COLLECTIONS_AND_THEMES = gql`
  query GetAllrecomendedRecipes($userId: String!) {
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

export default GET_COLLECTIONS_AND_THEMES;
