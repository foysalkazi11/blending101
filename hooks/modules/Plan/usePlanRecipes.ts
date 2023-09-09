import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import {
  ADD_RECIPE_TO_PLANNER,
  GET_ALL_PLANNER_RECIPES,
  GET_PLANNER_BY_WEEK,
  GET_QUEUED_PLANNER_RECIPES,
} from "../../../modules/plan/plan.graphql";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import Publish from "../../../helpers/Publish";
import { setDayRecipe } from "../../../redux/slices/Planner.slice";
import { useUser } from "../../../context/AuthProvider";

const useQueuedRecipe = (isWeekFromURL, week, queuedRecipes?: any) => {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);

  const userId = useUser().id;
  const [getQueuedRecipes, { loading }] = useLazyQuery(GET_QUEUED_PLANNER_RECIPES);

  useEffect(() => {
    if (queuedRecipes) return;
    if (userId !== "") {
      getQueuedRecipes({
        variables: {
          startDate: !isWeekFromURL ? format(week?.start, "yyyy-MM-dd") : router.query.start,
          endDate: !isWeekFromURL ? format(week?.end, "yyyy-MM-dd") : router.query.end,
          user: userId,
        },
      }).then((response) => {
        const data = response.data?.getQuedPlanner;
        setRecipes(data?.recipes);
      });
    }
  }, [getQueuedRecipes, isWeekFromURL, queuedRecipes, router.query.end, router.query.start, userId, week]);

  return { loading, recipes };
};

interface IAddRecipeToPlanHook {
  type: string;
  limit?: number;
  query: string;
  page: number;
  week: any;
  isWeekFromURL: boolean;
}

const useAddRecipeToMyPlan = (props: IAddRecipeToPlanHook) => {
  const { week, isWeekFromURL } = props;

  const router = useRouter();
  const [addRecipe, addState] = useMutation(ADD_RECIPE_TO_PLANNER, {
    refetchQueries: [GET_QUEUED_PLANNER_RECIPES],
  });

  const userId = useUser().id;

  const addRecipeToPlanner = async (recipe: any, date: string, setShowCalenderId: any) => {
    await Publish({
      mutate: addRecipe,
      variables: {
        assignDate: date,
        recipeId: recipe?.recipeId?._id,
        userId,
      },
      state: addState,
      success: `Added Planner sucessfully`,
      onSuccess: () => {
        setShowCalenderId("");
      },
      onUpdate(cache, { data: { createPlanner } }) {
        const defaultFetch = !isWeekFromURL && router.query.start && router.query.end;
        const GetPlanByWeek = {
          query: GET_PLANNER_BY_WEEK,
          variables: {
            userId: userId,
            startDate: !defaultFetch ? format(week.start, "yyyy-MM-dd") : router.query.start,
            endDate: !defaultFetch ? format(week.end, "yyyy-MM-dd") : router.query.end,
          },
        };
        const { getPlannerByDates } = cache.readQuery<any>(GetPlanByWeek);
        const planners = getPlannerByDates?.planners?.map((plan) => {
          if (plan.formatedDate === date) {
            const hasRecipes = plan.recipes.length > 0;
            return {
              ...plan,
              ...(hasRecipes ? {} : { _id: createPlanner?._id }),
              recipes: [
                ...plan.recipes,
                {
                  __typename: recipe.__typename,
                  recipeId: recipe.recipeId,
                  defaultVersion: {
                    ingredients: recipe.defaultVersion.ingredients,
                  },
                },
              ],
            };
          }
          return plan;
        });
        cache.writeQuery({
          ...GetPlanByWeek,
          data: {
            getPlannerByDates: {
              ...getPlannerByDates,
              planners,
            },
          },
        });

        const GetQueuedRecipesForPlanner = {
          query: GET_QUEUED_PLANNER_RECIPES,
          variables: {
            startDate: !defaultFetch ? format(week.start, "yyyy-MM-dd") : router.query.start,
            endDate: !defaultFetch ? format(week.end, "yyyy-MM-dd") : router.query.end,
            user: userId,
          },
        };

        const response = cache.readQuery<any>(GetQueuedRecipesForPlanner);
        if (response === null) return;

        const getQuedPlanner = response.getQuedPlanner;
        const isRecipeAlreadyExist = getQuedPlanner.recipes.some((r) => r?.recipeId?._id === recipe?.recipeId?._id);
        const recipes = {
          ...getQuedPlanner,
          totalRecipe: getQuedPlanner.totalRecipe + 1,
          recipes: [...getQuedPlanner.recipes, ...(isRecipeAlreadyExist ? [] : [recipe])],
        };
        console.log(getQuedPlanner, recipe, isRecipeAlreadyExist, recipes);

        // console.log(recipes, getQuedPlanner);

        cache.writeQuery({
          ...GetQueuedRecipesForPlanner,
          data: {
            getQuedPlanner: recipes,
          },
        });
      },
    });
  };
  return addRecipeToPlanner;
};

export { useQueuedRecipe, useAddRecipeToMyPlan };
