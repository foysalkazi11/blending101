import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { useUser } from "../../../../context/AuthProvider";

import Plan from "../../plan.types";

import { GET_PLAN_INSIGHTS } from "../../plan.graphql";

const usePlanInsights = (planList: Plan[]) => {
  const { id } = useUser();
  const recipes = useMemo(() => {
    const recipeList = [];
    planList.forEach((plan) => {
      plan.recipes.forEach((recipe) => recipeList.push(recipe.recipeId._id));
    });
    return recipeList;
  }, [planList]);

  const { data } = useQuery(GET_PLAN_INSIGHTS, {
    variables: {
      userId: id,
      recipes,
    },
    skip: recipes.length === 0,
  });

  return data?.getPlannerInsights;
};

export default usePlanInsights;
