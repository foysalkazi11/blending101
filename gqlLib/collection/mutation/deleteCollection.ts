import { gql } from "@apollo/client";

const DELETE_COLLECTION = gql`
  mutation Mutation($data: RemoveACollectionInput!) {
    deleteCollection(data: $data) {
      _id
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
        ingredients {
          ingredientId
          portion {
            measurement
            meausermentWeight
          }
        }
        url
        discovery
        favicon
      }
    }
  }
`;

export default DELETE_COLLECTION;
