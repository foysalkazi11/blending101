// DESCRIPTION: TO DERIVE RECIPES FROM THE PLANLIST STATE NOT FROM API

import { MyPlanItem } from "@/app/types/plan.types";
import { UserRecipe } from "@/recipe/recipe.types";
import { useMemo } from "react";

const useQueuedRecipes = (planlist: MyPlanItem[]) => {
  const recipes: UserRecipe[] = useMemo(
    () =>
      planlist
        .reduce((acc, cur) => acc.concat(cur.recipes), [])
        .filter((value, index, self) => index === self.findIndex((t) => t.recipeId._id === value.recipeId._id))
        .map((recipe: UserRecipe) => recipe),
    [planlist],
  );

  return recipes;
};

export default useQueuedRecipes;
