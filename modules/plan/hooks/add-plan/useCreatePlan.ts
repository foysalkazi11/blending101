// THIS HOOK CAN BE USED FOR BOTH CREATE AND CLONING PLAN

import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../../../context/AuthProvider";
import { getPlanImage } from "../../../../helpers/Plan";
import {
  CREATE_PLAN,
  GET_FEATURED_PLANS,
  GET_ALL_PLANS,
} from "../../plan.graphql";
import Plan from "@/plan/plan.types";

const useCreatePlan = (planlist: Plan[]) => {
  const { id } = useUser();
  const router = useRouter();

  const [createPlan] = useMutation(CREATE_PLAN, {
    refetchQueries: [GET_FEATURED_PLANS, GET_ALL_PLANS],
  });

  const createPlanHandler = useCallback(
    async (data) => {
      const planData = [];
      const recipeImages: string[] = [];
      planlist.forEach((plan) => {
        const recipeIds = [];
        plan.recipes?.forEach((recipe) => {
          const images = recipe.recipeId?.image;
          images?.length > 0 && recipeIds.push(recipe?.recipeId?._id);
          recipeImages.push(images[0]?.image);
        });
        planData.push({ day: plan.day, recipes: recipeIds });
      });

      const image = await getPlanImage(recipeImages);
      await createPlan({
        variables: {
          data: {
            memberId: id,
            ...data,
            planData,
            image,
          },
        },
      });
      router.push("/planner");
    },
    [createPlan, id, planlist, router],
  );

  return createPlanHandler;
};

export default useCreatePlan;
