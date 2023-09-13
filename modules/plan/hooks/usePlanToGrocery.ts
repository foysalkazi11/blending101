/*
  ||||||||||||||||||||||||||||||||||||
    ADD PLAN DATA TO GROCERY CART 
  ||||||||||||||||||||||||||||||||||||
*/

import { useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { ADD_TO_GROCERY_BY_PLAN } from "@/app/graphql/Cart";
import Publish from "helpers/Publish";
import { useCallback } from "react";

const usePlanToGrocery = (): ((planId: string) => void) => {
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

export default usePlanToGrocery;
