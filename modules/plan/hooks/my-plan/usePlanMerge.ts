import { ADD_TO_MY_PLAN, GET_PLANNER_BY_WEEK, GET_QUEUED_PLANNER_RECIPES } from "@/plan/plan.graphql";
import { useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import router, { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const usePlanMerge = () => {
  const { id: memberId } = useUser();

  const [isDuplicate, setIsDuplicate] = useState(false);

  const [addToMyPlan] = useMutation(ADD_TO_MY_PLAN, {
    refetchQueries: [GET_PLANNER_BY_WEEK, GET_QUEUED_PLANNER_RECIPES],
  });

  const addExistingPlan = useCallback(
    //REMOVE => REPLACE
    async (type: "WARNING" | "MERGE" | "REPLACE") => {
      if (type === "WARNING") return setIsDuplicate(true);
      await addToMyPlan({
        variables: {
          type,
          planId: router.query?.plan,
          memberId,
          startDate: router.query?.start,
          endDate: router.query?.end,
        },
      });
      router.query.alert = "false";
      router.replace(router);
      setIsDuplicate(false);
    },
    [addToMyPlan, memberId],
  );

  return {
    addExistingPlan,
    duplicateState: [isDuplicate, setIsDuplicate] as [boolean, typeof setIsDuplicate],
  };
};

export default usePlanMerge;
