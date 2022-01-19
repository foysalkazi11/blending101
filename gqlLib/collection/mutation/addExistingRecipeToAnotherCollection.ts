import { gql } from "@apollo/client";

const ADD_EXISTING_RECIPE_TO_ANOTHER_COLLECTION = gql`
  mutation Mutation($data: AddCRecipeTOAUserCollectionInput!) {
    addRecipeToAUserCollection(data: $data) {
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
        ingredients {
          _id
          ingredientId
          ingredientName
          category
          blendStatus
          classType
          nutrients {
            sourceId
            value
          }
          portions {
            measurement
            measurement2
            meausermentWeight
            sourceId
          }
          source
          description
          sourceId
          sourceCategory
          featuredImage
          images
        }
        url
        discovery
        favicon
      }
    }
  }
`;

export default ADD_EXISTING_RECIPE_TO_ANOTHER_COLLECTION;
