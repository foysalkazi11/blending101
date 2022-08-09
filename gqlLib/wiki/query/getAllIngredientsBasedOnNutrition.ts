import { gql } from "@apollo/client";

const GET_ALL_INGREDIENTS_BASED_ON_NURTITION = gql`
  query GetAllIngredientsBasedOnNutrition(
    $data: GetIngredientsFromNutrition!
    $userId: String
  ) {
    getAllIngredientsBasedOnNutrition(data: $data, userId: $userId) {
      wikiTitle
      wikiDescription
      nutrientName
      wikiCoverImages
      wikiFeatureImage
      bodies
      ingredients {
        ingredientId
        name
        value
        units
      }
      type
      category
      publishedBy
      isPublished
      commentsCount
    }
  }
`;

export default GET_ALL_INGREDIENTS_BASED_ON_NURTITION;
