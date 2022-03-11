/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import NewEditRecipe from "../../../components/newEdit/newEdit.page";
import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";

const EditRecipe = () => {
  const router = useRouter();
  const { recipe__Id } = router.query;

  const { data } = useQuery(GET_RECIPE, {
    variables: { recipeId: recipe__Id },
    skip: !recipe__Id,
  });

  if(!data) return null

  return <NewEditRecipe data={data?.getARecipe} />;
};

export default EditRecipe;
