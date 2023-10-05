// DESCRIPTION: TO DERIVE RECIPES FROM THE PLANLIST STATE NOT FROM API

import { PlanItem } from "@/app/types/plan.types";
import { UserRecipe, PublicRecipe } from "@/recipe/recipe.types";
import { useMemo } from "react";

const useQueuedRecipes = (planlist: PlanItem[]) => {
  const recipes: UserRecipe[] = useMemo(
    () =>
      planlist
        .reduce((acc, cur) => acc.concat(cur.recipes), [])
        .filter((value, index, self) => index === self.findIndex((t) => t._id === value._id))
        .map((recipe: PublicRecipe) => ({
          recipeId: recipe,
          defaultVersion: recipe?.defaultVersion,
        })),
    [planlist],
  );

  return recipes;
};

export default useQueuedRecipes;
