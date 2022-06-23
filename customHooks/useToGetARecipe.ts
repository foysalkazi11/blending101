import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_RECIPE } from "../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";

const useToGetARecipe = () => {
  const dispatch = useAppDispatch();

  const [getARecipe] = useLazyQuery(GET_RECIPE, {
    fetchPolicy: "network-only",
  });
  const { dbUser } = useAppSelector((state) => state?.user);

  const handleToGetARecipe = async (id: string) => {
    try {
      const { data } = await getARecipe({
        variables: { recipeId: id, userId: dbUser?._id },
      });
      dispatch(setDetailsARecipe(data?.getARecipe));
    } catch (error) {
      console.log(error);
    }
  };

  return handleToGetARecipe;
};

export default useToGetARecipe;
