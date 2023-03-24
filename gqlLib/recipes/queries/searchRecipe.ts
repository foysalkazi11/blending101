import { gql } from "@apollo/client";

const SEARCH_RECIPE = gql`
  query SearchRecipes(
    $userId: String!
    $searchTerm: String!
    $page: Float
    $limit: Float
  ) {
    searchRecipes(
      userId: $userId
      searchTerm: $searchTerm
      page: $page
      limit: $limit
    ) {
      totalRecipes
      recipes {
        recipeId {
          _id
          name
          image {
            image
            default
          }
          originalVersion {
            _id
            postfixTitle
          }
          userId {
            _id
            displayName
            image
          }
          brand {
            _id
            brandName
            brandImage
          }
          averageRating
          numberOfRating
        }
        defaultVersion {
          _id
          postfixTitle
          ingredients {
            ingredientId {
              _id
              ingredientName
            }
          }
          description
        }
        isMatch
        allRecipes
        myRecipes
        notes
        addedToCompare
        userCollections
        versionCount
      }
    }
  }
`;

export default SEARCH_RECIPE;
