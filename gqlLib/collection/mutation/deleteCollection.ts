import { gql } from "@apollo/client";

const DELETE_COLLECTION = gql`
  mutation DeleteCollection($data: RemoveACollectionInput!) {
    deleteCollection(data: $data) {
      _id
      name
      image
      slug
      recipes {
        recipeId {
          _id
          name
          image {
            default
            image
          }
        }
      }
    }
  }
`;

export default DELETE_COLLECTION;
