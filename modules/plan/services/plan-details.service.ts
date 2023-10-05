export const addRecipe = (plans, day, recipe) => {
  return plans.map((plan, idx) => {
    if (+day === idx + 1) {
      const isDuplicateRecipe = plan.recipes.some((item) => item?._id === recipe?._id);
      if (isDuplicateRecipe) return plan;
      else {
        return {
          ...plan,
          recipes: [...plan.recipes, { ...recipe, ...recipe?.recipeId }],
        };
      }
    } else {
      return plan;
    }
  });
};

export const deleteRecipe = (plans, planId, recipeId) => {
  return plans.map((plan) => {
    if (planId === plan?.id) {
      return {
        ...plan,
        recipes: plan?.recipes.filter((recipe) => recipe?._id !== recipeId),
      };
    } else {
      return plan;
    }
  });
};

export const moveRecipe = (plans, dropId, draggedItem) => {
  return plans.map((plan) => {
    // When a plan is dropped to a new day we have to add plan
    if (plan.id === dropId) {
      return {
        ...plan,
        //Checking if the new recipe already exists
        recipes: plan.recipes.find((recipe) => recipe._id === draggedItem.recipe._id)
          ? plan.recipes
          : plan.recipes.concat(draggedItem.recipe),
      };
    }
    // Clearing the current days recipe as the recipe is moved to some different date
    else if (plan.id === draggedItem.plannerId) {
      return {
        ...plan,
        recipes: plan.recipes.filter((recipe) => recipe._id !== draggedItem.recipe._id),
      };
    } else {
      return plan;
    }
  });
};
