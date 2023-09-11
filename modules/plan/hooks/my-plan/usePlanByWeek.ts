import { GetPlannerByWeek } from "@/app/types/plan.types";
import { GET_PLANNER_BY_WEEK } from "@/plan/plan.graphql";
import { useLazyQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { IWeek } from "./usePlanWeek";
import { UserRecipe } from "@/recipe/recipe.types";

const usePlanByWeek = (week: IWeek, addExistingPlan: (type: "WARNING" | "MERGE" | "REPLACE") => Promise<void>) => {
  const { id } = useUser();

  const [getPlanByWeek, { data }] = useLazyQuery<GetPlannerByWeek>(GET_PLANNER_BY_WEEK);

  const myPlan = data?.getPlannerByDates;

  useEffect(() => {
    if (!id) return;
    getPlanByWeek({
      variables: {
        userId: id,
        startDate: format(week.start, "yyyy-MM-dd"),
        endDate: format(week.end, "yyyy-MM-dd"),
      },
    }).then((response) => {
      // MERGE OR REPLACE CHECKING

      // IF THERE ARE NO QUERYPARAMS OR MERGE/REPLACE IS ALREADY DONE
      if (!week.isWeekFromUrl || week.url.alert === "false") return;

      //CHECKING IF THE MENTIONED WEEK HAS ANY RECIPES ON IT
      const hasRecipes = response?.data?.getPlannerByDates?.planners.some((planner) => planner?.recipes.length > 0);

      // IF THERE ARE RECIPES SHOW WARNING POPUP
      if (hasRecipes) addExistingPlan("WARNING");
      // ADDING IT TO THE LIST IF THERE IS NO RECIPES ON THAT WEEK
      else addExistingPlan("MERGE");
    });
  }, [addExistingPlan, getPlanByWeek, id, week]);

  // LISTING OUT ALL THE RECIPES FROM THAT WEEK
  const recipes = useMemo(() => {
    let ids = [];
    let allRecipes: UserRecipe[] = [];
    myPlan?.planners?.forEach((plan) => {
      plan.recipes.forEach((recipe) => {
        if (ids.includes(recipe.recipeId._id)) return;

        ids.push(recipe.recipeId._id);
        allRecipes.push(recipe);
      });
    });
    return allRecipes;
  }, [myPlan]);

  return {
    plans: myPlan?.planners || [],
    recipes,
    insights: {
      macros: myPlan?.macroMakeup,
      ingredients: myPlan?.topIngredients,
      categories: myPlan?.recipeCategoriesPercentage,
      calories: myPlan?.calorie,
      score: myPlan?.rxScore,
    },
  };
};

export default usePlanByWeek;
