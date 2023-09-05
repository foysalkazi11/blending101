import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { useUser } from "../../../../context/AuthProvider";
import {
  GET_FEATURED_PLANS,
  GET_ALL_PLANS,
  EDIT_PLAN,
} from "../../plan.graphql";
import Publish from "helpers/Publish";

const useEditPlan = (planlist: any[]) => {
  const { id } = useUser();
  const [editPlan, editState] = useMutation(EDIT_PLAN, {
    refetchQueries: [GET_FEATURED_PLANS, GET_ALL_PLANS],
  });

  const editPlanHandler = useCallback(
    async (planId, data) => {
      const planData = {
        memberId: id,
        editId: planId,
        editableObject: {
          ...data,
          planData: planlist.map((plan) => ({
            day: plan.day,
            recipes: plan.recipes.map((recipe) => recipe._id),
          })),
        },
      };
      await Publish({
        mutate: editPlan,
        state: editState,
        variables: { data: planData },
        success: "Edited the Plan",
      });
    },
    [editPlan, editState, id, planlist],
  );

  return editPlanHandler;
};

export default useEditPlan;
