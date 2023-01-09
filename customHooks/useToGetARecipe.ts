import { useLazyQuery } from "@apollo/client";
import { GET_RECIPE } from "../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { setOpenVersionTray } from "../redux/slices/versionTraySlice";
import { RecipeVersionType } from "../type/recipeVersionType";

const useToGetARecipe = () => {
  const dispatch = useAppDispatch();
  const [getARecipe] = useLazyQuery(GET_RECIPE, {
    fetchPolicy: "cache-and-network",
  });
  const handleToGetARecipe = async (
    recipeId: string,
    userId: string,
    getARecipeFunc: any = getARecipe,
  ) => {
    try {
      const { data } = await getARecipeFunc({
        variables: { recipeId, userId },
      });
      const recipe = data?.getARecipe;
      if (recipe?.originalVersion?._id === recipe?.defaultVersion?._id) {
        const { _id, description }: RecipeVersionType = recipe?.originalVersion;
        dispatch(
          setDetailsARecipe({
            ...recipe,
            versionId: _id,
            versionDiscription: description,
            ingredients: recipe?.defaultVersion?.ingredients,
          }),
        );
      } else {
        const { _id, recipeId, description, ...rest }: RecipeVersionType =
          recipe?.defaultVersion;
        const obj = {
          _id: recipeId,
          versionId: _id,
          versionDiscription: description,
          ...rest,
        };
        dispatch(
          setDetailsARecipe({
            ...recipe,
            ...obj,
          }),
        );
      }

      dispatch(setOpenVersionTray(false));
    } catch (error) {
      console.log(error);
    }
  };

  return handleToGetARecipe;
};

export default useToGetARecipe;
