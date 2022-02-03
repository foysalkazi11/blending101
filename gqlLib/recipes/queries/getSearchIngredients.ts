import { gql } from "@apollo/client";

export const SEARCH_RESULTS_EDIT_RECIPE = gql`
  query SearchIngredients($term: String!) {
    SearchIngredients(searchTerm: $term) {
      ingredientName
      description
      images
      featuredImage
      nutrients {
        value
        uniqueNutrientRefference {
          nutrient
          category
          unitName
          min
        }
      }
    }
  }
`;

export const NUTRITION_BASED_RECIPE = gql`
  query {
    getNutritionBasedOnRecipe(
      ingredientsInfo: [
        { ingredientId: "61c6e4453a320071dc96ab1a", value: 12 }
        { ingredientId: "61c6e4453a320071dc96ab3e", value: 40 }
        { ingredientId: "61c6e4463a320071dc96ab87", value: 76 }
      ]
    ) {
      value
      uniqueNutrientRefference {
        nutrient
        unitName
      }
    }
  }
`;

export const INGREDIENTS_BY_CATEGORY_AND_CLASS = gql`
  query filterIngredientByCategoryAndClass($classType: String!) {
    filterIngredientByCategoryAndClass(
      data: { ingredientCategory: $classType, IngredientClass: 1 }
    ) {
      _id
      ingredientId
      ingredientName
      category
      featuredImage
      classType
      portions {
        measurement
        measurement2
        default
        meausermentWeight
      }
    }
  }
`;
