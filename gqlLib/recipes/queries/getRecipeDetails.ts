import { gql } from "@apollo/client";

export const GET_RECIPE = gql`
  query GetARecipe($ingredientId:String!){
    getARecipe(recipeId: "620654ab4b75758e00c4e90c") {
      name
      image {
        image
        default
      }
    }
  }
`;
