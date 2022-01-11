import { gql } from "@apollo/client";

const CREATE_NEW_COLLECTION = gql`
  mutation Mutation($data: CreateNewCollection!) {
    createNewCollection(data: $data) {
      _id
      name
      recipes {
        image {
          default
          image
        }
        name
        _id
      }
      image
    }
  }
`;
export default CREATE_NEW_COLLECTION;
