import { UserRecipe } from "../../recipe/recipe.types";

export const addRecipe = (plans, day, recipe: UserRecipe) => {
  return plans.map((plan) => {
    if (+day === plan.day) {
      const isDuplicateRecipe = plan.recipes.some((item) => item?.recipeId._id === recipe?.recipeId._id);
      if (isDuplicateRecipe) return plan;
      else {
        return {
          ...plan,
          recipes: [...plan.recipes, recipe],
        };
      }
    } else {
      return plan;
    }
  });
};

export const deleteRecipeFromPlan = (setPlanlist, day, recipeId) => {
  setPlanlist((list) =>
    list.map((plan) => {
      if (+day === plan?.day) {
        return {
          ...plan,
          recipes: plan?.recipes.filter((recipe) => recipe?.recipeId?._id !== recipeId),
        };
      } else {
        return plan;
      }
    }),
  );
};
