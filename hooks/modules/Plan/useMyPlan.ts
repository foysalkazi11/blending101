import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ADD_RECIPE_TO_PLANNER,
  DELETE_RECIPE_FROM_PLANNER,
  GET_PLANNER_BY_WEEK,
  MOVE_PLANNER,
} from "../../../graphql/Planner";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import Publish from "../../../helpers/Publish";

interface IPlanByWeekHook {
  week: any;
  setShowDuplicateAlert: any;
  isFetchingFromURL: boolean;
}

const usePlanByWeek = (props: IPlanByWeekHook) => {
  let { week, isFetchingFromURL, setShowDuplicateAlert } = props;

  const router = useRouter();
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [getPlanByWeek, { data }] = useLazyQuery(GET_PLANNER_BY_WEEK);

  useEffect(() => {
    if (memberId === "") return;
    const defaultFetch =
      !isFetchingFromURL && router.query.start && router.query.end;
    getPlanByWeek({
      variables: {
        userId: memberId,
        startDate: !defaultFetch
          ? format(week.start, "yyyy-MM-dd")
          : router.query.start,
        endDate: !defaultFetch
          ? format(week.end, "yyyy-MM-dd")
          : router.query.end,
      },
    }).then((response) => {
      if (
        router.query?.plan &&
        !isFetchingFromURL &&
        response?.data?.getPlannerByDates?.planners.some(
          (planner) => planner?.recipes.length > 0,
        )
      ) {
        setShowDuplicateAlert(true);
      }
      //! HERE SOME BUGS MIGHT OCCUR
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isFetchingFromURL = true;
    });
  }, [getPlanByWeek, memberId, router.query, setShowDuplicateAlert, week]);

  const { plan } = useMemo(() => {
    if (!data?.getPlannerByDates) return { plans: [] };
    return {
      plan: data?.getPlannerByDates.planners.map((planner) => ({
        id: planner._id,
        date: planner.formatedDate,
        recipes: planner.recipes.map((recipe) => ({
          _id: recipe?.recipeId?._id,
          name: recipe?.recipeId?.name,
          category: recipe?.recipeId?.recipeBlendCategory?.name,
          rxScore: 786,
          calorie: 250,
          ingredients: recipe?.defaultVersion?.ingredients,
        })),
      })),
    };
  }, [data?.getPlannerByDates]);

  return {
    plans: plan,
    topIngredients: data?.getPlannerByDates.topIngredients,
    recipeTypes: data?.getPlannerByDates?.recipeCategoriesPercentage,
  };
};

const useWeek = () => {
  const router = useRouter();
  const fetchedFromUrl = useRef(false);
  const [week, setWeek] = useState({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  useEffect(() => {
    if (fetchedFromUrl.current || !router.query.start || !router.query.end)
      return;
    setWeek({
      start: new Date(router.query.start as string),
      end: new Date(router.query.end as string),
    });
  }, [router.query.end, router.query.start]);

  return { week, setWeek, isFetchingFromURL: fetchedFromUrl.current };
};

const useDeletePlanRecipe = (
  plannerId: string,
  week: any,
  isWeekFromURL: boolean,
) => {
  const router = useRouter();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [deleteRecipes, deleteState] = useMutation(DELETE_RECIPE_FROM_PLANNER);

  const deleteHandler = async (id) => {
    await Publish({
      mutate: deleteRecipes,
      variables: {
        plannerId,
        recipeId: id,
      },
      state: deleteState,
      success: `Deleted Planner sucessfully`,
      onUpdate(cache) {
        const GetPlanByWeek = {
          query: GET_PLANNER_BY_WEEK,
          variables: {
            userId: userId,
            startDate: !isWeekFromURL
              ? format(week.start, "yyyy-MM-dd")
              : router.query.start,
            endDate: !isWeekFromURL
              ? format(week.end, "yyyy-MM-dd")
              : router.query.end,
          },
        };
        const { getPlannerByDates } = cache.readQuery<any>(GetPlanByWeek);
        cache.writeQuery({
          ...GetPlanByWeek,
          data: {
            getPlannerByDates: {
              ...getPlannerByDates,
              planners: getPlannerByDates.planners.map((planner) => {
                if (planner?._id === plannerId) {
                  return {
                    ...planner,
                    recipes: planner.recipes.filter(
                      (recipe) => recipe?.recipeId?._id !== id,
                    ),
                  };
                }
                return planner;
              }),
            },
          },
        });
      },
    });
  };
  return deleteHandler;
};

const useCopyPlanRecipe = (week, isWeekFromURL) => {
  const router = useRouter();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [copyRecipes, copyState] = useMutation(ADD_RECIPE_TO_PLANNER, {
    refetchQueries: [GET_PLANNER_BY_WEEK],
  });

  const copyHandler = async (date, recipe) => {
    await Publish({
      mutate: copyRecipes,
      variables: {
        assignDate: date,
        recipeId: recipe._id,
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

const useMovePlanRecipe = (plannerId) => {
  const [moveRecipes, moveState] = useMutation(MOVE_PLANNER, {
    refetchQueries: [GET_PLANNER_BY_WEEK],
  });
  const moveHandler = async (date, recipe) => {
    await Publish({
      mutate: moveRecipes,
      variables: {
        data: {
          plannerId,
          assignDate: date,
          recipeId: recipe._id,
        },
      },
      state: moveState,
      success: `Moved Planner sucessfully`,
    });
  };
  return moveHandler;
};

export {
  usePlanByWeek,
  useWeek,
  useDeletePlanRecipe,
  useCopyPlanRecipe,
  useMovePlanRecipe,
};
