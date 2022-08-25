import { gql } from "@apollo/client";

export const FETCH_BLEND_CATEGORIES = gql`
  query Query {
    getAllCategories {
      _id
      name
      image
      icon
    }
  }
`;
