import { useQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { GET_PLAN } from "@/plan/plan.graphql";
import { useMemo } from "react";
import { GetAPlan } from "@/app/types/plan.types";
import { PublicRecipe, UserRecipe } from "@/recipe/recipe.types";

const usePlanDetails = (planId) => {
  const { id: memberId } = useUser();

  const { data } = useQuery<GetAPlan>(GET_PLAN, {
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

  const recipes: UserRecipe[] = useMemo(
    () =>
      plan?.planData
        .reduce((acc, cur) => acc.concat(cur.recipes), [])
        .filter((value, index, self) => index === self.findIndex((t) => t._id === value._id))
        .map((recipe: PublicRecipe) => ({
          recipeId: recipe,
          defaultVersion: recipe?.defaultVersion,
        })),
    [plan],
  );

  return { plan, insights, recipes };
};

export default usePlanDetails;
