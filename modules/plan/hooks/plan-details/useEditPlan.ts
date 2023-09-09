import { PlanItem } from "@/app/types/plan.types";
import { useMutation } from "@apollo/client";
import { getPlanImage } from "helpers/Plan";
import Publish from "helpers/Publish";
import { useCallback } from "react";
import { useUser } from "../../../../context/AuthProvider";
import {
  EDIT_PLAN,
  GET_ALL_PLANS,
  GET_FEATURED_PLANS,
} from "../../plan.graphql";

const useEditPlan = (planlist: PlanItem[]) => {
  const { id } = useUser();
  const [editPlan, editState] = useMutation(EDIT_PLAN, {
    refetchQueries: [GET_FEATURED_PLANS, GET_ALL_PLANS],
  });

  const editPlanHandler = useCallback(
    async (planId, data) => {
      const planData = [];
      const recipeImages: string[] = [];
      planlist.forEach((plan) => {
        const recipeIds = [];
        plan.recipes?.forEach((recipe) => {
          recipeIds.push(recipe?._id);
          recipeImages.push(recipe?.image[0]?.image);
        });
        planData.push({ day: plan.day, recipes: recipeIds });
      });

      const image = await getPlanImage(recipeImages);

      await Publish({
        mutate: editPlan,
        state: editState,
        variables: {
          data: {
            memberId: id,
            editId: planId,
            editableObject: {
              ...data,
              planData,
              image,
            },
          },
        },
        success: "Edited the Plan",
      });
    },
    [editPlan, editState, id, planlist],
  );

  return editPlanHandler;
};

export default useEditPlan;
