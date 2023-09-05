import { useQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { GET_PLAN } from "@/plan/plan.graphql";
import { useEffect, useMemo, useState } from "react";

const usePlanDetails = (planId) => {
  const { id: memberId } = useUser();

  const { data } = useQuery(GET_PLAN, {
    variables: { planId: planId, token: "", memberId },
    skip: planId === "",
  });

  const { plan, insights } = useMemo(
    () => ({
      plan: data?.getAPlan?.plan,
      insights: {
        categories: data?.getAPlan?.recipeCategoriesPercentage,
        ingredients: data?.getAPlan?.topIngredients,
        macros: data?.getAPlan?.macroMakeup,
      },
    }),
    [data],
  );
  const recipes = useMemo(
    () =>
      plan?.planData
        .reduce((acc, cur) => acc.concat(cur.recipes), [])
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id),
        )
        .map((recipe) => ({
          recipeId: recipe,
          defaultVersion: recipe?.defaultVersion,
        })),
    [plan],
  );

  return { plan, insights, recipes };
};

export default usePlanDetails;
