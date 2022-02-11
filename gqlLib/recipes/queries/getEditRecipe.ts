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

export const NUTRITION_BASED_RECIPE = (array: string) => gql`
  query  {
    getNutritionBasedOnRecipe(
      ingredientsInfo: ${array}
    ) {
      value
      uniqueNutrientRefference {
        _id
        nutrient
        unitName
        category
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

export const BLEND_CATEGORY = gql`
  query {
    getAllCategories {
      _id
      name
    }
  }
`;
