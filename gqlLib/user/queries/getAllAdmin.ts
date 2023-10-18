import { gql } from "@apollo/client";

const GET_ALL_ADMIN = gql`
  query GetAllAdmin {
    getAllAdmin {
      _id
      firstName
      lastName
      displayName
    }
  }
`;

export default GET_ALL_ADMIN;
