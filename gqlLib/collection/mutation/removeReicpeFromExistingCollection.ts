import { gql } from "@apollo/client";

const REMOVE_EXISTING_RECIPE_TO_ANOTHER_COLLECTION = gql`
  mutation Mutation($data: AddCRecipeTOAUserCollectionInput!) {
    removeRecipeFromAColection(data: $data) {
      _id
      name
      image
      recipes {
        image {
          default
          image
        }
        name
        _id
        description
        prepTime
        cookTime
        totalTime
        recipeYield
        recipeIngredients
        recipeInstructions
        recipeCuisines

        url
        discovery
        favicon
      }
    }
  }
`;

export default REMOVE_EXISTING_RECIPE_TO_ANOTHER_COLLECTION;
