import { gql } from "@apollo/client";

const DELETE_COLLECTION = gql`
  mutation DeleteCollection($data: RemoveACollectionInput!) {
    deleteCollection(data: $data)
  }
`;

export default DELETE_COLLECTION;
