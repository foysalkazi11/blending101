import { gql } from "@apollo/client";

export const GET_CATEGORY_FOR_COMBOBOX = gql`
  query GetBlendCategories {
    getAllCategories {
      value: _id
      label: name
    }
  }
`;

export const GET_BLEND_TYPES = gql`
  query GetBlendCategories {
    getAllCategories {
      _id
      name
      image
    }
  }
`;
