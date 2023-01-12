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
      recipes {
        datePublished
        name
        recipeIngredients
        recipeBlendCategory {
          name
        }

        image {
          image
          default
        }
        description
        prepTime
        cookTime
        totalTime
        _id
        url
        favicon
        averageRating
        numberOfRating
        ingredients {
          ingredientId {
            _id
            ingredientName
          }
        }
        notes
        addedToCompare
        userCollections
        defaultVersion {
          postfixTitle
        }
        isMatch
        userId {
          _id
          displayName
          image
        }
        recipeVersion {
          _id
          isDefault
          isOriginal
          postfixTitle
          description
        }
      }
      totalRecipes
    }
  }
`;

export default SEARCH_RECIPE;
