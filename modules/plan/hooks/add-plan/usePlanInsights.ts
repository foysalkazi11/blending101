import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { useUser } from "context/AuthProvider";

import Plan from "@/plan/plan.types";

import { GET_PLAN_INSIGHTS } from "@/plan/plan.graphql";

const usePlanInsights = (planList: Plan[]) => {
  const { id } = useUser();
  const { days, recipes } = useMemo(() => {
    let numberOfDays = 0;
    const recipeList = [];
    planList.forEach((plan) => {
      if (plan.recipes.length > 0) numberOfDays++;
      plan.recipes.forEach((recipe) => recipeList.push(recipe.recipeId._id));
    });
    return { days: numberOfDays, recipes: recipeList };
  }, [planList]);

  const { data } = useQuery(GET_PLAN_INSIGHTS, {
    variables: {
      userId: id,
      recipes,
      days,
    },
    skip: recipes.length === 0,
  });

  return data?.getPlannerInsights;
};

export default usePlanInsights;
