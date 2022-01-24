import { gql } from "@apollo/client";

const GET_ALL_RECIPES_WITHIN_COLLECTIONS = gql`
  query GetAllRecipesFromCollection($userEmail: String!) {
    getAllRecipesFromCollection(userEmail: $userEmail) {
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
`;

export default GET_ALL_RECIPES_WITHIN_COLLECTIONS;
