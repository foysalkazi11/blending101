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

  console.log(ingredients_list)

  const fetchRecipe = () => {
    getBlendNutritionBasedOnRecipe();
  };
  useEffect(() => {
    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AddRecipePage
        nutritionData={
          nutritionData &&
          JSON.parse(nutritionData?.getBlendNutritionBasedOnRecipe)
        }
      />
    </div>
  );
};

export default EditRecipe;
