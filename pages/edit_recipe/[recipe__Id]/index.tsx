import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import EditRecipePage from "../../../components/recipe/editRecipe/EditRecipe.component";
import { GET_EDIT_RECIPE_NUTRITION } from "../../../gqlLib/recipes/queries/getEditRecipe";
import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useAppSelector } from "../../../redux/hooks";

const EditRecipe = () => {
  const router = useRouter();
  const { recipe__Id } = router?.query;
  useEffect(() => {
    getARecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe__Id]);

  const [getARecipe, { loading: gettingRecipe, data: recipeData }] = useLazyQuery(
    GET_RECIPE,
    {
      fetchPolicy: "network-only",
      variables: { recipeId: recipe__Id },
    }
  );

  useEffect(() => {
    if (!recipeData) return;
    // console.log(recipeData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData]);

  return (
    <div>
      <EditRecipePage
        // mode={"edit"}
        recipeName={recipeData && recipeData?.getARecipe?.name}
        // nutritionData={
        //   nutritionData && JSON.parse(nutritionData?.getBlendNutritionBasedOnRecipe)
        // }
      />
    </div>
  );
};

export default EditRecipe;
