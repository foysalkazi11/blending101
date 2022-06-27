import { useLazyQuery } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect } from "react";
import GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX from "../gqlLib/recipes/queries/getBlendNutritionBasedOnRecipeXxx";

const useGetBlendNutritionBasedOnRecipexxx = (
  selectedIngredientsList: Array<any> = [],
  nutritionState: any = {},
  SetcalculateIngOz: Dispatch<SetStateAction<number>> = () => {},
  isRecipeDetailsPage: boolean = false,
) => {
  const [getBlendNutritionBasedOnRecipe, { loading, data, error }] =
    useLazyQuery(GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX);

  useEffect(() => {
    if (isRecipeDetailsPage) {
      if (nutritionState?.ingredientId?._id) {
        // Single Ingredient Details
        getBlendNutritionBasedOnRecipe({
          variables: {
            ingredientsInfo: [
              {
                ingredientId: nutritionState?.ingredientId?._id,
                value: parseFloat(nutritionState?.selectedPortion?.gram),
              },
            ],
          },
        });
      } else {
        getBlendNutritionBasedOnRecipe({
          variables: {
            ingredientsInfo: [
              ...selectedIngredientsList?.map((item) => ({
                ingredientId: item.ingredientId._id,
                value: item?.selectedPortion?.gram,
              })),
            ],
          },
        });
      }
    } else {
      // Single Ingredient Details
      if (nutritionState?._id) {
        let value = nutritionState?.portions?.find(
          (item) => item.default,
        )?.meausermentWeight;
        if (value) {
          getBlendNutritionBasedOnRecipe({
            variables: {
              ingredientsInfo: [
                {
                  ingredientId: nutritionState?._id,
                  value: parseFloat(value),
                },
              ],
            },
          });
        }
      } else {
        let ingArr = [];
        let ozArr = 0;
        console.log(selectedIngredientsList);
        selectedIngredientsList?.forEach((item) => {
          let value: any = 0;
          if (item.hasOwnProperty("selectedPortion")) {
            value = item?.selectedPortion?.gram;
          } else {
            value = item?.portions?.find(
              (item) => item.default,
            )?.meausermentWeight;
          }
          ozArr += value && parseInt(value);
          if (value) {
            ingArr?.push({
              ingredientId: item?._id,
              value: parseFloat(value),
            });
          }
        });
        SetcalculateIngOz(Math?.round(ozArr * 0.033814));
        getBlendNutritionBasedOnRecipe({
          variables: {
            ingredientsInfo: ingArr,
          },
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIngredientsList, nutritionState]);

  return { data, loading, error };
};

export default useGetBlendNutritionBasedOnRecipexxx;
