// THIS HOOK CAN BE USED FOR BOTH CREATE AND CLONING PLAN

import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../../../context/AuthProvider";
import { getPlanImage } from "../../../../helpers/Plan";
import { CREATE_PLAN, GET_FEATURED_PLANS, GET_ALL_PLANS } from "../../plan.graphql";
import { MyPlanItem } from "@/app/types/plan.types";
import Publish from "helpers/Publish";
import { toast } from "react-toastify";

const useCreatePlan = (planlist: MyPlanItem[]) => {
  const { id } = useUser();
  const router = useRouter();

  const [createPlan, createState] = useMutation(CREATE_PLAN, {
    refetchQueries: [GET_FEATURED_PLANS, GET_ALL_PLANS],
  });

  const createPlanHandler = useCallback(
    async (data) => {
      const planData = [];
      const recipeImages: string[] = [];
      planlist.forEach((plan, index) => {
        const recipeIds = [];
        plan.recipes?.forEach((recipe) => {
          const images = recipe.recipeId?.image;
          images?.length > 0 && recipeIds.push(recipe?.recipeId?._id);
          recipeImages.push(images[0]?.image);
        });
        planData.push({ day: index + 1, recipes: recipeIds });
      });

      const loading = toast.loading("Saving the plan", {
        position: toast.POSITION.TOP_RIGHT,
      });
      const image = await getPlanImage(recipeImages);
      await Publish({
        message: loading,
        mutate: createPlan,
        state: createState,
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
    [createPlan, createState, id, planlist, router],
  );

  return createPlanHandler;
};

export default useCreatePlan;
