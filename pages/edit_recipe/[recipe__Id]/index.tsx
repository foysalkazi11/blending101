import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import EditRecipePage from "../../../components/recipe/editRecipe/EditRecipe.component";
import { GET_EDIT_RECIPE_NUTRITION } from "../../../gqlLib/recipes/queries/getEditRecipe";
import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useAppSelector } from "../../../redux/hooks";

const EditRecipe = () => {
  const router = useRouter();
  const { recipe__Id } = router.query;
  const ingredients_list = useAppSelector(
    (state) => state?.quantityAdjuster?.ingredientsList
  );
  const [
    getBlendNutritionBasedOnRecipe,
    { loading: gettingNutritionData, data: nutritionData },
  ] = useLazyQuery(GET_EDIT_RECIPE_NUTRITION(ingredients_list));

  const [getARecipe, { loading: gettingRecipe, data: recipeData }] = useLazyQuery(
    GET_RECIPE,
    {
      fetchPolicy: "network-only",
      variables: { recipeId: recipe__Id },
    }
  );
  useEffect(() => {
    getBlendNutritionBasedOnRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nutritionData]);
  useEffect(() => {
    getARecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData]);

  recipeData && console.log(recipeData);
  nutritionData && console.log(nutritionData);
  return (
    <div>
      <EditRecipePage
        mode={"edit"}
        recipeData={recipeData && recipeData?.getARecipe}
        nutritionData={
          nutritionData && JSON.parse(nutritionData?.getBlendNutritionBasedOnRecipe)
        }
      />
    </div>
  );
};

export default EditRecipe;
