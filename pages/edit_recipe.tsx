import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import EditRecipePage from "../components/recipe/editRecipe/EditRecipe.component";
import { GET_EDIT_RECIPE_NUTRITION } from "../gqlLib/recipes/queries/getEditRecipe";
import { useAppSelector } from "../redux/hooks";

const EditRecipe = () => {
  const ingredients_list = useAppSelector((state) => state.quantityAdjuster.ingredientsList);
  const [getBlendNutritionBasedOnRecipe, { loading: gettingNutritionData, data: nutritionData }] = useLazyQuery(
    GET_EDIT_RECIPE_NUTRITION(ingredients_list)
  );

  const fetchRecipe = () => {
    getBlendNutritionBasedOnRecipe();
  };
  useEffect(() => {
    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      edit recip
      {/* <EditRecipePage
        nutritionData={
          nutritionData &&
          JSON.parse(nutritionData?.getBlendNutritionBasedOnRecipe)
        }
      /> */}
    </div>
  );
};

export default EditRecipe;
