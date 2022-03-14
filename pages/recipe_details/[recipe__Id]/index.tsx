import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import RecipeDetails from "../../../components/recipe/recipeDetails/RecipeDetails";
import {
  GET_NUTRITION,
  GET_RECIPE,
} from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { recipe__Id } = router.query;
  const [nutritionState, setNutritionState] = useState(null);
  const [singleElement, setsingleElement] = useState(false);
  const [getARecipe, { loading: gettingRecipe, data: recipeData }] =
    useLazyQuery(GET_RECIPE, {
      fetchPolicy: "network-only",
      variables: { recipeId: recipe__Id },
    });
  useEffect(() => {
    getARecipe();
    if (recipeData) {
      setNutritionState(recipeData?.getARecipe?.ingredients);
      fetchRecipe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData]);



  useEffect(() => {
    if (recipeData && singleElement===false) {
      setNutritionState(recipeData?.getARecipe?.ingredients);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nutritionState,singleElement]);

  const [
    getBlendNutritionBasedOnRecipe,
    { loading: gettingNutritionData, data: nutritionData },
  ] = useLazyQuery(GET_NUTRITION(nutritionState));

  const fetchRecipe = () => {
    getBlendNutritionBasedOnRecipe();
  };

  return (
    <RecipeDetails
      recipeData={recipeData && recipeData?.getARecipe}
      nutritionData={
        nutritionData &&
        JSON.parse(nutritionData?.getBlendNutritionBasedOnRecipe)
      }
      nutritionState={nutritionState}
      setNutritionState={setNutritionState}
      singleElement={singleElement}
      setsingleElement={setsingleElement}
    />
  );
};

export default Index;
