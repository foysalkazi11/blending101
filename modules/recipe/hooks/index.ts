import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { ADD_TO_GROCERY_BY_RECIPE } from "@/app/graphql/Cart";
import { GET_CATEGORY_FOR_COMBOBOX } from "@/app/graphql/Recipe";
import Publish from "helpers/Publish";
import { useCallback, useMemo } from "react";
import { RecipeCategory } from "../recipe.types";

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

/*
  ||||||||||||||||||||||||||||||||||||
    GET RECIPE CATEGORY LIST 
  ||||||||||||||||||||||||||||||||||||
*/

export const useRecipeCategory = (): { value: string; label: string }[] => {
  const { data } = useQuery(GET_CATEGORY_FOR_COMBOBOX);

  const categories = useMemo(() => {
    return data?.getAllCategories
      ? [{ label: "All", value: "all" }, ...data?.getAllCategories]
      : [{ label: "All", value: "all" }];
  }, [data?.getAllCategories]);

  return categories;
};
