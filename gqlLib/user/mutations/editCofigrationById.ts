import { gql } from "@apollo/client";

const EDIT_CONFIGURATION_BY_ID = gql`
  mutation EditConfigurationById($data: EditConfiguration!) {
    editConfigurationById(data: $data)
  }
`;
export default EDIT_CONFIGURATION_BY_ID;
