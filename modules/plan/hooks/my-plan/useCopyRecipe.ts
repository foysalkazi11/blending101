import { ADD_RECIPE_TO_PLANNER, GET_PLANNER_BY_WEEK } from "@/plan/plan.graphql";
import { useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import Publish from "helpers/Publish";

const useCopyRecipe = () => {
  const { id: userId } = useUser();

  const [copyRecipes, copyState] = useMutation(ADD_RECIPE_TO_PLANNER, {
    refetchQueries: [GET_PLANNER_BY_WEEK],
  });

  const copyHandler = async (date: string, recipeId: string) => {
    await Publish({
      mutate: copyRecipes,
      variables: {
        assignDate: date,
        recipeId: recipeId,
        userId,
      },
      state: copyState,
      success: `Copied Planner sucessfully`,
      onSuccess: (data) => {
        // dispatch(
        //   addPlanner({
        //     id: data?.createPlanner?._id,
        //     date: date,
        //     recipe: {
        //       _id: recipe._id,
        //       name: recipe.name,
        //       category: recipe?.category,
        //       rxScore: 786,
        //       calorie: 250,
        //     },
        //   }),
        // );
      },
      // onUpdate(cache) {
      //   const GetPlanByWeek = {
      //     query: GET_PLANNER_BY_WEEK,
      //     variables: {
      //       userId: userId,
      //       startDate: !isWeekFromURL
      //         ? format(week.start, "yyyy-MM-dd")
      //         : router.query.start,
      //       endDate: !isWeekFromURL
      //         ? format(week.end, "yyyy-MM-dd")
      //         : router.query.end,
      //     },
      //   };
      //   const { getPlannerByDates } = cache.readQuery<any>(GetPlanByWeek);
      //   console.log(
      //     recipe,
      //     // getPlannerByDates?.planners?.map((plan) => {
      //     //   if (plan.formatedDate === date) {
      //     //     return {
      //     //       ...plan,
      //     //       recipes: [
      //     //         ...plan.recipes,
      //     //         {
      //     //           __typename: recipe.__typename,
      //     //           recipeId: recipe.recipeId,
      //     //           defaultVersion: {
      //     //             ingredients: recipe.defaultVersion.ingredients,
      //     //           },
      //     //         },
      //     //       ],
      //     //     };
      //     //   }
      //     //   return plan;
      //     // }),
      //   );
      //   // cache.writeQuery({
      //   //   ...GetPlanByWeek,
      //   //   data: {
      //   //     getPlannerByDates: {
      //   //       ...getPlannerByDates,
      //   //       planners: getPlannerByDates?.planners?.map((plan) => {
      //   //         if (plan.formatedDate === date) {
      //   //           return {
      //   //             ...plan,
      //   //             recipes: [
      //   //               ...plan.recipes,
      //   //               {
      //   //                 __typename: recipe.__typename,
      //   //                 recipeId: recipe.recipeId,
      //   //                 defaultVersion: {
      //   //                   ingredients: recipe.defaultVersion.ingredients,
      //   //                 },
      //   //               },
      //   //             ],
      //   //           };
      //   //         }
      //   //         return plan;
      //   //       }),
      //   //     },
      //   //   },
      //   // });
      // },
    });
  };
  return copyHandler;
};

export default useCopyRecipe;
