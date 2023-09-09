import { DELETE_RECIPE_FROM_PLANNER, GET_QUEUED_PLANNER_RECIPES, GET_PLANNER_BY_WEEK } from "@/plan/plan.graphql";
import { useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { format } from "date-fns";
import Publish from "helpers/Publish";
import { useRouter } from "next/router";

const useDeleteRecipe = () => {
  const router = useRouter();
  const { id: userId } = useUser();

  const [deleteRecipes, deleteState] = useMutation(DELETE_RECIPE_FROM_PLANNER, {
    refetchQueries: [GET_QUEUED_PLANNER_RECIPES],
  });

  const deleteHandler = async (plannerId: string, recipeId: string) => {
    await Publish({
      mutate: deleteRecipes,
      variables: {
        plannerId,
        recipeId,
      },
      state: deleteState,
      success: `Deleted Planner sucessfully`,
      // onUpdate(cache) {
      //   const GetPlanByWeek = {
      //     query: GET_PLANNER_BY_WEEK,
      //     variables: {
      //       userId: userId,
      //       startDate: !isWeekFromURL ? format(week.start, "yyyy-MM-dd") : router.query.start,
      //       endDate: !isWeekFromURL ? format(week.end, "yyyy-MM-dd") : router.query.end,
      //     },
      //   };
      //   const { getPlannerByDates } = cache.readQuery<any>(GetPlanByWeek);
      //   cache.writeQuery({
      //     ...GetPlanByWeek,
      //     data: {
      //       getPlannerByDates: {
      //         ...getPlannerByDates,
      //         planners: getPlannerByDates.planners.map((planner) => {
      //           if (planner?._id === plannerId) {
      //             return {
      //               ...planner,
      //               recipes: planner.recipes.filter((recipe) => recipe?.recipeId?._id !== id),
      //             };
      //           }
      //           return planner;
      //         }),
      //       },
      //     },
      //   });
      // },
    });
  };
  return deleteHandler;
};

export default useDeleteRecipe;
