import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import RecipeDetails from "../../components/recipe/recipeDetails/RecipeDetails";
import { GET_RECIPE } from "../../gqlLib/recipes/queries/getRecipeDetails";

const Index = () => {
  const [getARecipe, { loading: gettingRecipe, data: recipeData }] =
    useLazyQuery(GET_RECIPE, {
      fetchPolicy: "network-only",
      variables: { recipeId: "620b900ecfac42ae66855eb3" },
    });

  const fetchRecipe = () => {
    getARecipe();
    if (!recipeData) return;
  };
  useEffect(() => {
    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RecipeDetails recipeData={recipeData} />;
};

export default Index;
