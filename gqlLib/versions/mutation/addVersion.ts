import { gql } from "@apollo/client";

const ADD_VERSION = gql`
  mutation AddVersion($data: AddVersion!) {
    addVersion(data: $data) {
      _id
      postfixTitle
      description
    }
  }
`;

export default ADD_VERSION;
