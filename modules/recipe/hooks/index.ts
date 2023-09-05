import { useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { ADD_TO_GROCERY_BY_RECIPE } from "graphql/Cart";
import Publish from "helpers/Publish";
import { useCallback } from "react";

/*
  ||||||||||||||||||||||||||||||||||||
    ADD RECIPE DATA TO GROCERY CART 
  ||||||||||||||||||||||||||||||||||||
*/

export const useRecipeToGrocery = (): ((recipeId: string) => void) => {
  const { id: memberId } = useUser();

  const [addGrocery, addState] = useMutation(ADD_TO_GROCERY_BY_RECIPE, {
    refetchQueries: ["GetCartData"],
  });

  const addToGrocery = useCallback(
    async (recipeId: string) => {
      await Publish({
        mutate: addGrocery,
        variables: {
          recipeId,
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
