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

        url
        discovery
        favicon
      }
    }
  }
`;

export default DELETE_COLLECTION;
