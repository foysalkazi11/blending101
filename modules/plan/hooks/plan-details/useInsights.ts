import { useEffect, useMemo } from "react";
import { useApolloClient, useLazyQuery, useQuery } from "@apollo/client";

import { useUser } from "context/AuthProvider";

import { GetAPlan, GetPlanInsights, PlanItem } from "@/app/types/plan.types";

import { GET_PLAN, GET_PLAN_INSIGHTS } from "@/plan/plan.graphql";

const useInsights = (planId: string, planList: PlanItem[]) => {
  const { id } = useUser();
  const client = useApolloClient();

  const [getInsights, { data }] = useLazyQuery<GetPlanInsights>(GET_PLAN_INSIGHTS);

  useEffect(() => {
    if (planList.length === 0) return;
    let days = 0;
    const recipes = [];
    planList?.forEach((plan) => {
      if (plan.recipes.length > 0) days++;
      plan.recipes.forEach((recipe) => recipes.push(recipe._id));
    });
    getInsights({
      variables: {
        userId: id,
        recipes,
        days,
      },
    });
  }, [client, getInsights, id, planId, planList]);

  const insight = data?.getPlannerInsights;
  return {
    score: 0,
    calories: insight?.calorie,
    categories: insight?.recipeCategoriesPercentage,
    ingredients: insight?.topIngredients,
    macros: insight?.macroMakeup,
  };
};

export default useInsights;
