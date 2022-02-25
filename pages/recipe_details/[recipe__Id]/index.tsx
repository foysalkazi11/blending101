import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import RecipeDetails from "../../../components/recipe/recipeDetails/RecipeDetails";
import {
  GET_NUTRITION,
  GET_RECIPE,
} from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { recipe__Id } = router.query;
  const [getARecipe, { loading: gettingRecipe, data: recipeData }] =
    useLazyQuery(GET_RECIPE, {
      fetchPolicy: "network-only",
      variables: { recipeId: recipe__Id },
    });
  useEffect(() => {
    getARecipe();
    if (recipeData) {
      fetchRecipe();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData]);

  const [
    getBlendNutritionBasedOnRecipe,
    { loading: gettingNutritionData, data: nutritionData },
  ] = useLazyQuery(GET_NUTRITION(recipeData?.getARecipe?.ingredients));

  const fetchRecipe = () => {
    getBlendNutritionBasedOnRecipe();
  };
  console.log(recipeData);
  return (
    <RecipeDetails
      recipeData={recipeData && recipeData?.getARecipe}
      nutritionData={
        nutritionData &&
        JSON.parse(nutritionData?.getBlendNutritionBasedOnRecipe)
      }
    />
  );
};

export default Index;
