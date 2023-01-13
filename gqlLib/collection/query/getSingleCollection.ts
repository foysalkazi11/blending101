import { gql } from "@apollo/client";

const GET_SINGLE_COLLECTION = gql`
  query getASingleCollection(
    $creatorId: String
    $userId: String!
    $slug: String!
  ) {
    getASingleCollection(creatorId: $creatorId, userId: $userId, slug: $slug) {
      name
      image
      recipes {
        image {
          default
          image
        }
        name
        _id
        description
        prepTime
        cookTime
        totalTime
        recipeYield
        recipeIngredients
        recipeInstructions
        recipeCuisines
        url
        discovery
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
      }
    }
  }
`;

export default GET_SINGLE_COLLECTION;
