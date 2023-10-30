import { gql } from "@apollo/client";

const GET_ALL_BLEND_NUTRIENTS_FOR_WIKI = gql`
  query GetAllBlendNutrientsForWiki {
    getAllBlendNutrientsForWiki {
      _id
      nutrientName
      category {
        _id
      }
    }
  }
`;

export default GET_ALL_BLEND_NUTRIENTS_FOR_WIKI;
