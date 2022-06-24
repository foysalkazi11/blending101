import { useLazyQuery } from "@apollo/client";
import { GET_RECIPE } from "../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";

const useToGetARecipe = () => {
  const dispatch = useAppDispatch();

  const [getARecipe] = useLazyQuery(GET_RECIPE, {
    fetchPolicy: "network-only",
  });

  const handleToGetARecipe = async (recipeId: string, userId: string) => {
    try {
      const { data } = await getARecipe({
        variables: { recipeId, userId: userId },
      });
      dispatch(setDetailsARecipe(data?.getARecipe));
    } catch (error) {
      console.log(error);
    }
  };

  return handleToGetARecipe;
};

export default useToGetARecipe;
