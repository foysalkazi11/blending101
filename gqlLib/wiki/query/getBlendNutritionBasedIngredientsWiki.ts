import { gql } from "@apollo/client";

const GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI = gql`
  query GetBlendNutritionBasedIngredientsWiki(
    $ingredientsInfo: [BlendIngredientInfo!]!
    $userId: String
  ) {
    getBlendNutritionBasedIngredientsWiki(
      ingredientsInfo: $ingredientsInfo
      userId: $userId
    ) {
      wikiTitle
      wikiDescription
      ingredientName
      wikiCoverImages
      wikiFeatureImage
      bodies
      type
      category
      publishedBy
      isPublished
      commentsCount
      portions {
        measurement
        meausermentWeight
        default
      }
    }
  }
`;

export default GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI;
