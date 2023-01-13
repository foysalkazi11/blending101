import { useLazyQuery } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect, useCallback } from "react";
import notification from "../components/utility/reactToastifyNotification";
import GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS from "../gqlLib/nutrition/query/getNutrientsListAndGiGlByIngredients";

interface IngredientsInfo {
  ingredientId: string;
  value: number;
}

const useGetBlendNutritionBasedOnRecipexxx = (
  selectedIngredientsList: Array<any> = [],
  nutritionState: any = {},
  SetcalculateIngOz: Dispatch<SetStateAction<number>> = () => {},
  isRecipeDetailsPage: boolean = false,
) => {
  const [getNutrientsListAndGiGlByIngredients, { loading, data, error }] =
    useLazyQuery(GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS);

  const fetchData = (ingredientsInfo: IngredientsInfo[]) => {
    try {
      getNutrientsListAndGiGlByIngredients({
        variables: {
          ingredientsInfo,
        },
      });
    } catch (error) {
      notification("error", "failed to fetch nutrients list");
    }
  };

  const handleFetchIngrdients = useCallback(() => {
    if (isRecipeDetailsPage) {
      if (nutritionState?.ingredientId?._id) {
        // Single Ingredient Details

        const data = [
          {
            ingredientId: nutritionState?.ingredientId?._id,
            value: parseFloat(nutritionState?.selectedPortion?.gram),
          },
        ];
        fetchData(data);
      } else {
        const data = [
          ...selectedIngredientsList?.map((item) => ({
            ingredientId: item.ingredientId._id,
            value: item?.selectedPortion?.gram,
          })),
        ];
        fetchData(data);
      }
    } else {
      // Single Ingredient Details
      if (nutritionState?._id) {
        const value = nutritionState?.selectedPortion?.gram;
        if (value) {
          const data = [
            {
              ingredientId: nutritionState?._id,
              value: parseFloat(value),
            },
          ];
          fetchData(data);
        }
      } else {
        let ingArr = [];
        let ozArr = 0;
        selectedIngredientsList?.forEach((item) => {
          let value: any = 0;
          if (item.hasOwnProperty("selectedPortion")) {
            value = item?.weightInGram;
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
        fetchData(ingArr);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIngredientsList, nutritionState]);

  useEffect(() => {
    handleFetchIngrdients();
  }, [handleFetchIngrdients]);

  return { data, loading, error };
};

export default useGetBlendNutritionBasedOnRecipexxx;
