import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { useUser } from "../../../../context/AuthProvider";
import { CREATE_PLAN, GET_FEATURED_PLANS, GET_ALL_PLANS } from "../../plan.graphql";
import Publish from "helpers/Publish";
import { PlanItem } from "@/app/types/plan.types";
import { getPlanImage } from "helpers/Plan";
import { toast } from "react-toastify";

const useClonePlan = (planlist: PlanItem[]) => {
  const { id } = useUser();
  const [clonePlan, cloneState] = useMutation(CREATE_PLAN, {
    refetchQueries: [GET_FEATURED_PLANS, GET_ALL_PLANS],
  });

  const clonePlanHandler = useCallback(
    async (data) => {
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

      const loading = toast.loading("Saving the plan", {
        position: toast.POSITION.TOP_RIGHT,
      });
      const image = await getPlanImage(recipeImages);
      await Publish({
        message: loading,
        mutate: clonePlan,
        state: cloneState,
        variables: {
          data: {
            memberId: id,
            ...data,
            planData,
            image,
          },
        },
        success: "Created a new version of the Plan",
      });
    },
    [clonePlan, cloneState, id, planlist],
  );

  return clonePlanHandler;
};

export default useClonePlan;
