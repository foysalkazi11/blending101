import { DELETE_PLAN, GET_ALL_PLANS, GET_FEATURED_PLANS } from "@/plan/plan.graphql";
import { useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import Publish, { OnUpdate } from "helpers/Publish";
import React, { useCallback } from "react";

const useDeletePlan = (onUpdate?: OnUpdate) => {
  const { id: memberId } = useUser();

  const [deletePlan, deleteState] = useMutation(DELETE_PLAN, {
    refetchQueries: [GET_ALL_PLANS, GET_FEATURED_PLANS],
  });

  const deletePlanHandler = useCallback(
    async (planId) => {
      await Publish({
        mutate: deletePlan,
        state: deleteState,
        variables: { memberId, planId },
        success: "Created a new version of the Plan",
        onUpdate(cache, data) {},
      });
    },
    [deletePlan, deleteState, memberId],
  );

  return deletePlanHandler;
};

export default useDeletePlan;
