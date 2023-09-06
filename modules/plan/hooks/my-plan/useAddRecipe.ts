import { useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import {
  ADD_RECIPE_TO_PLANNER,
  GET_QUEUED_PLANNER_RECIPES,
} from "@/plan/plan.graphql";
import Publish from "helpers/Publish";

interface IAddRecipeToPlan {
  onSuccess?: () => void;
}

const useAddRecipeToMyPlan = (args: IAddRecipeToPlan) => {
  const { onSuccess } = args;
  const [addRecipe, addState] = useMutation(ADD_RECIPE_TO_PLANNER, {
    refetchQueries: [GET_QUEUED_PLANNER_RECIPES],
  });
  const { id: userId } = useUser();

  const addRecipeToPlan = async (recipeId: string, date: string) => {
    await Publish({
      mutate: addRecipe,
      variables: {
        assignDate: date,
        recipeId: recipeId,
        userId,
      },
      state: addState,
      success: `Added Planner sucessfully`,
      onSuccess,
      // onUpdate(cache, { data: { createPlanner } }) {
      //   const defaultFetch =
      //     !isWeekFromURL && router.query.start && router.query.end;
      //   const GetPlanByWeek = {
      //     query: GET_PLANNER_BY_WEEK,
      //     variables: {
      //       userId: userId,
      //       startDate: !defaultFetch
      //         ? format(week.start, "yyyy-MM-dd")
      //         : router.query.start,
      //       endDate: !defaultFetch
      //         ? format(week.end, "yyyy-MM-dd")
      //         : router.query.end,
      //     },
      //   };
      //   const { getPlannerByDates } = cache.readQuery<any>(GetPlanByWeek);
      //   const planners = getPlannerByDates?.planners?.map((plan) => {
      //     if (plan.formatedDate === date) {
      //       const hasRecipes = plan.recipes.length > 0;
      //       return {
      //         ...plan,
      //         ...(hasRecipes ? {} : { _id: createPlanner?._id }),
      //         recipes: [
      //           ...plan.recipes,
      //           {
      //             __typename: recipe.__typename,
      //             recipeId: recipe.recipeId,
      //             defaultVersion: {
      //               ingredients: recipe.defaultVersion.ingredients,
      //             },
      //           },
      //         ],
      //       };
      //     }
      //     return plan;
      //   });
      //   cache.writeQuery({
      //     ...GetPlanByWeek,
      //     data: {
      //       getPlannerByDates: {
      //         ...getPlannerByDates,
      //         planners,
      //       },
      //     },
      //   });

      //   const GetQueuedRecipesForPlanner = {
      //     query: GET_QUEUED_PLANNER_RECIPES,
      //     variables: {
      //       startDate: !defaultFetch
      //         ? format(week.start, "yyyy-MM-dd")
      //         : router.query.start,
      //       endDate: !defaultFetch
      //         ? format(week.end, "yyyy-MM-dd")
      //         : router.query.end,
      //       user: userId,
      //     },
      //   };

      //   const response = cache.readQuery<any>(GetQueuedRecipesForPlanner);
      //   if (response === null) return;

      //   const getQuedPlanner = response.getQuedPlanner;
      //   const isRecipeAlreadyExist = getQuedPlanner.recipes.some(
      //     (r) => r?.recipeId?._id === recipe?.recipeId?._id,
      //   );
      //   const recipes = {
      //     ...getQuedPlanner,
      //     totalRecipe: getQuedPlanner.totalRecipe + 1,
      //     recipes: [
      //       ...getQuedPlanner.recipes,
      //       ...(isRecipeAlreadyExist ? [] : [recipe]),
      //     ],
      //   };
      //   console.log(getQuedPlanner, recipe, isRecipeAlreadyExist, recipes);

      //   // console.log(recipes, getQuedPlanner);

      //   cache.writeQuery({
      //     ...GetQueuedRecipesForPlanner,
      //     data: {
      //       getQuedPlanner: recipes,
      //     },
      //   });
      // },
    });
  };
  return addRecipeToPlan;
};

export default useAddRecipeToMyPlan;
