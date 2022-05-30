import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import AddRecipePage from "../components/recipe/addRecipe/AddRecipe.component";
import { GET_RECIPE_NUTRITION } from "../gqlLib/recipes/queries/getEditRecipe";
import { useAppSelector } from "../redux/hooks";

const EditRecipe = () => {
  const ingredients_list = useAppSelector(
    (state) => state.quantityAdjuster.ingredientsList
  );

  const [
    getBlendNutritionBasedOnRecipe,
    { loading: gettingNutritionData, data: nutritionData },
  ] = useLazyQuery(GET_RECIPE_NUTRITION(ingredients_list));

  console.log(ingredients_list);

  useEffect(() => {
    getBlendNutritionBasedOnRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients_list]);

  return (
    <AddRecipePage
      nutritionData={
        nutritionData &&
        JSON?.parse(nutritionData?.getBlendNutritionBasedOnRecipexxx)
      }
    />
  );
};

export default EditRecipe;
