/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import AddRecipePage from "../components/recipe/addRecipe/AddRecipe.component";
import { GET_RECIPE_NUTRITION } from "../gqlLib/recipes/queries/getEditRecipe";
import { useAppSelector } from "../redux/hooks";

const EditRecipe = () => {
  const ingredients_list = useAppSelector(
    (state) => state.quantityAdjuster.ingredientsList
  );

  const [getBlendNutritionBasedOnRecipe, { data: nutritionData }] = useLazyQuery(
    GET_RECIPE_NUTRITION(ingredients_list)
  );

  const recipeBasedNutrition = nutritionData?.getBlendNutritionBasedOnRecipexxx;

  useEffect(() => {
    getBlendNutritionBasedOnRecipe();
  }, []);

  return (
    <AddRecipePage
      nutritionData={
        recipeBasedNutrition &&
        JSON.parse(recipeBasedNutrition)
      }
    />
  );
};

export default EditRecipe;
