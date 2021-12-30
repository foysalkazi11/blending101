import { gql } from "@apollo/client";

const EDIT_USER_BY_ID = gql`
  mutation EditUserById($data: EditAdmin!) {
    editUserById(data: $data)
  }
`;

export default EDIT_USER_BY_ID;
