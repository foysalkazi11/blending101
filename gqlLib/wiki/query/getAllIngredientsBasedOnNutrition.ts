import { gql } from '@apollo/client';

const GET_ALL_INGREDIENTS_BASED_ON_NURTITION = gql`
  query Query($data: GetIngredientsFromNutrition!) {
    getAllIngredientsBasedOnNutrition(data: $data) {
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

export default GET_ALL_INGREDIENTS_BASED_ON_NURTITION;
