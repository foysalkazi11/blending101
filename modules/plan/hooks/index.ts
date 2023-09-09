import { useLazyQuery, useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { ADD_TO_GROCERY_BY_PLAN } from "graphql/Cart";
import { GET_ALL_PLANNER_RECIPES, SHARE_PLAN } from "@/plan/plan.graphql";
import Publish from "helpers/Publish";
import { useCallback, useEffect, useRef, useState } from "react";

/*
  ||||||||||||||||||||||||||||||||||||
    TO SHARE PLAN 
  ||||||||||||||||||||||||||||||||||||
*/
export const useSharePlan = (planId): [string, () => void] => {
  const { id: userId } = useUser();
  const [sharePlan, { data: share }] = useMutation(SHARE_PLAN);

  const [link, setLink] = useState("");

  useEffect(() => {
    if (!share?.sharePlan) return;
    setLink(`${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/planner/plan/shared/?token=${share?.sharePlan}`);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/planner/plan/shared/?token=${share?.sharePlan}`,
    );
  }, [share]);

  const getLink = useCallback(async () => {
    await sharePlan({
      variables: {
        userId,
        planId,
      },
    });
  }, [planId, sharePlan, userId]);

  return [link, getLink];
};

/*
  ||||||||||||||||||||||||||||||||||||
    ADD PLAN DATA TO GROCERY CART 
  ||||||||||||||||||||||||||||||||||||
*/

export const usePlanToGrocery = (): ((planId: string) => void) => {
  const { id: memberId } = useUser();

  const [addGrocery, addState] = useMutation(ADD_TO_GROCERY_BY_PLAN, {
    refetchQueries: ["GetCartData"],
  });

  const addToGrocery = useCallback(
    async (planId: string) => {
      await Publish({
        mutate: addGrocery,
        variables: {
          planId,
          memberId,
        },
        state: addState,
        success: `Added Ingredients to the Grocery List`,
      });
    },
    [addGrocery, addState, memberId],
  );

  return addToGrocery;
};
