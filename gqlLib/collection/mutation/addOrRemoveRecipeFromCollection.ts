import { gql } from "@apollo/client";

const ADD_OR_REMOVE_RECIPE_FORM_COLLECTION = gql`
  mutation AddOrRemoveRecipeFromCollection(
    $data: AddOrRemoveRecipeFromCollectionInput!
  ) {
    addOrRemoveRecipeFromCollection(data: $data) {
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

export default ADD_OR_REMOVE_RECIPE_FORM_COLLECTION;
