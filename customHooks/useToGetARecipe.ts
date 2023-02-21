import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import notification from "../components/utility/reactToastifyNotification";
import GET_A_RECIPE from "../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { setOpenVersionTray } from "../redux/slices/versionTraySlice";
import { RecipeVersionType } from "../type/recipeVersionType";

const useToGetARecipe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [getARecipe, { ...rest }] = useLazyQuery(GET_A_RECIPE, {
    fetchPolicy: "cache-and-network",
  });
  const handleToGetARecipe = async (
    recipeId: string,
    userId: string,
    token: any = "",
  ) => {
    try {
      const { data } = await getARecipe({
        variables: { recipeId: token ? "" : recipeId, userId, token },
      });
      const recipe = data?.getARecipe2;
      const { recipeId: recipeDetails, defaultVersion, isMatch } = recipe;
      dispatch(setDetailsARecipe(recipe));

      // if (isMatch) {
      //   const { _id, description }: RecipeVersionType =
      //     recipeDetails?.originalVersion;
      //   dispatch(
      //     setDetailsARecipe({
      //       ...recipe,
      //       versionId: _id,
      //       versionDiscription: description,
      //       ingredients: recipe?.defaultVersion?.ingredients,
      //       isVersionActive: false,
      //     }),
      //   );
      // } else {
      //   const { _id, recipeId, description, ...rest }: RecipeVersionType =
      //     recipe?.defaultVersion;
      //   const obj = {
      //     _id: recipeId,
      //     versionId: _id,
      //     versionDiscription: description,
      //     isVersionActive: true,
      //     ...rest,
      //   };
      //   dispatch(
      //     setDetailsARecipe({
      //       ...recipe,
      //       ...obj,
      //     }),
      //   );
      // }

      dispatch(setOpenVersionTray(false));
    } catch (error) {
      notification("error", "Recipe not found");
      // router.push("/404");
    }
  };

  return { handleToGetARecipe, ...rest };
};

export default useToGetARecipe;
