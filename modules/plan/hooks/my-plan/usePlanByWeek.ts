import { GetPlannerByWeek, MyPlanItem } from "@/app/types/plan.types";
import { GET_PLANNER_BY_WEEK, ADD_TO_MY_PLAN, GET_QUEUED_PLANNER_RECIPES } from "@/plan/plan.graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useMemo, useCallback } from "react";

interface IPlanByWeekHook {
  week: any;
}

const usePlanByWeek = (props: IPlanByWeekHook) => {
  let { week } = props;

  const { id } = useUser();
  const [getPlanByWeek, { data }] = useLazyQuery<GetPlannerByWeek>(GET_PLANNER_BY_WEEK);

  useEffect(() => {
    getPlanByWeek({
      variables: {
        userId: id,
        startDate: format(week.start, "yyyy-MM-dd"),
        endDate: format(week.end, "yyyy-MM-dd"),
      },
    });
  }, [getPlanByWeek, id, week]);

  return {
    plans: data?.getPlannerByDates.planners,
    insights: {
      macros: data?.getPlannerByDates.macroMakeup,
      ingredients: data?.getPlannerByDates.topIngredients,
      categories: data?.getPlannerByDates.recipeCategoriesPercentage,
    },
  };
};

export default usePlanByWeek;
