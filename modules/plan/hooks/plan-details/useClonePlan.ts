import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { useUser } from "../../../../context/AuthProvider";
import {
  CREATE_PLAN,
  GET_FEATURED_PLANS,
  GET_ALL_PLANS,
} from "../../plan.graphql";
import Publish from "helpers/Publish";

const useClonePlan = (planlist: any[]) => {
  const { id } = useUser();
  const [clonePlan, cloneState] = useMutation(CREATE_PLAN, {
    refetchQueries: [GET_FEATURED_PLANS, GET_ALL_PLANS],
  });

  const clonePlanHandler = useCallback(
    async (data) => {
      const planData = {
        memberId: id,
        ...data,
        planData: planlist.map((plan) => ({
          day: plan.day,
          recipes: plan.recipes.map((recipe) => recipe._id),
        })),
      };
      await Publish({
        mutate: clonePlan,
        state: cloneState,
        variables: { data: planData },
        success: "Created a new version of the Plan",
      });
    },
    [clonePlan, cloneState, id, planlist],
  );

  return clonePlanHandler;
};

export default useClonePlan;
