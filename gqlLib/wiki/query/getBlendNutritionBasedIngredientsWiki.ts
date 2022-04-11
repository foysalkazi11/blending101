import { gql } from "@apollo/client";

const GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI = gql`
  query GetBlendNutritionBasedIngredientsWiki(
    $ingredientsInfo: [BlendIngredientInfo!]!
  ) {
    getBlendNutritionBasedIngredientsWiki(ingredientsInfo: $ingredientsInfo) {
      wikiTitle
      wikiDescription
      ingredientName
      wikiCoverImages
      wikiFeatureImage
      bodies
      nutrients
      type
      category
      publishedBy
      seoTitle
      seoSlug
      seoCanonicalURL
      seoSiteMapPriority
      seoKeywords
      seoMetaDescription
      isPublished
    }
  }
`;

export default GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI;
