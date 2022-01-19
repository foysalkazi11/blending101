import { gql } from "@apollo/client";

export const FETCH_BLEND_CATEGORIES = gql`
  query {
    getAllCategories {
      _id
      name
      slug
      description
      image
      icon
    }
  }
`;
