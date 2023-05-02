import { useQuery } from "@apollo/client";
import router from "next/router";
import { useMemo } from "react";
import { GET_PLAN } from "../../../graphql/Planner";

const usePlan = () => {
  const { data, loading } = useQuery(GET_PLAN, {
    variables: { planId: router.query.planId },
    skip: router.query.planId === "",
  });

  const plan = useMemo(() => {
    if (!data?.getAPlan) return { plans: [] };
    return data?.getPlannerByDates.planners.map((planner) => ({
      id: planner._id,
      date: planner.formatedDate,
      recipes: planner.recipes.map((recipe) => ({
        _id: recipe?.recipeId?._id,
        name: recipe?.recipeId?.name,
        category: recipe?.recipeId?.recipeBlendCategory?.name,
        rxScore: 786,
        calorie: 250,
        ingredients: recipe?.defaultVersion?.ingredients,
      })),
    }));
  }, [data?.getAPlan, data?.getPlannerByDates.planners]);

  return { plan, loading };
};

export default usePlan;
