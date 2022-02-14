import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import RecipeDetails from "../../components/recipe/recipeDetails/RecipeDetails";
import { GET_RECIPE } from "../../gqlLib/recipes/queries/getRecipeDetails";

const Index = () => {
  // const [getARecipe, { loading: gettingRecipe, data: recipeData }] =
  //   useLazyQuery(GET_RECIPE, {
  //     fetchPolicy: "network-only",
  //     variables: { ingredientId: "620654ab4b75758e00c4e90c" },
  //   });
  // const fetchRecipe = async () => {
  //   await getARecipe();
  //   console.log(recipeData);
  // };
  // useEffect(() => {
  //   getARecipe();

  // }, []);
  return <RecipeDetails />;
};

export default Index;
