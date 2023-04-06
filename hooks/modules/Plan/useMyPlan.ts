import { useLazyQuery } from "@apollo/client";
import { GET_PLANNER_BY_WEEK } from "../../../graphql/Planner";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";

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
        response?.data?.getPlannerByDates?.planners.length > 0
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

export { usePlanByWeek, useWeek };
