import { gql } from "@apollo/client";

const ADD_VERSION = gql`
  mutation AddVersion($data: AddVersion!) {
    addVersion(data: $data) {
      _id
      postfixTitle
      description
      createdAt
      editedAt
      isDefault
      isOriginal
    }
  }
`;

export default ADD_VERSION;
