import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import RecipeDetails from "../../../components/recipe/recipeDetails/RecipeDetails";
import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const {recipe__Id}=router.query;
  const [getARecipe, { loading: gettingRecipe, data: recipeData }] =
  useLazyQuery(GET_RECIPE, {
    fetchPolicy: "network-only",
    variables: { recipeId: recipe__Id },
  });

  const fetchRecipe = () => {
    getARecipe();
    if (!recipeData) return;
  };
  useEffect(() => {
    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RecipeDetails recipeData={recipeData && recipeData?.getARecipe} />;
};

export default Index;
