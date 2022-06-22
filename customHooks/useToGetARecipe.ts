import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_RECIPE } from "../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";

const useToGetARecipe = (recipeId: string) => {
  const dispatch = useAppDispatch();

  const [getARecipe, data] = useLazyQuery(GET_RECIPE, {});
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

  useEffect(() => {
    if (recipeId) {
      handleToGetARecipe(recipeId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  return data;
};
