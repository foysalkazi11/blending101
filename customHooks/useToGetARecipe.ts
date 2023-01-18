import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import notification from "../components/utility/reactToastifyNotification";
import { GET_RECIPE } from "../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { setOpenVersionTray } from "../redux/slices/versionTraySlice";
import { RecipeVersionType } from "../type/recipeVersionType";

const useToGetARecipe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [getARecipe] = useLazyQuery(GET_RECIPE, {
    fetchPolicy: "cache-and-network",
  });
  const handleToGetARecipe = async (
    recipeId: string,
    userId: string,
    getARecipeFunc: any = getARecipe,
    token: any = "",
  ) => {
    try {
      const { data } = await getARecipeFunc({
        variables: { recipeId: token ? "" : recipeId, userId, token },
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
            isVersionActive: false,
          }),
        );
      } else {
        const { _id, recipeId, description, ...rest }: RecipeVersionType =
          recipe?.defaultVersion;
        const obj = {
          _id: recipeId,
          versionId: _id,
          versionDiscription: description,
          isVersionActive: true,
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
      notification("error", "Recipe not found");
      // router.push("/404");
    }
  };

  return handleToGetARecipe;
};

export default useToGetARecipe;
