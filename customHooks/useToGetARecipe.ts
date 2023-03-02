import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import notification from "../components/utility/reactToastifyNotification";
import GET_A_RECIPE from "../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { setOpenVersionTray } from "../redux/slices/versionTraySlice";
import { RecipeDetailsType } from "../type/recipeDetailsType";
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
      const recipe: RecipeDetailsType = data?.getARecipe2;
      let defaultVersion = recipe?.isMatch
        ? {
            ...recipe?.defaultVersion,
            postfixTitle: recipe?.recipeId?.name || "",
            description: recipe?.recipeId?.description || "",
          }
        : {
            ...recipe?.defaultVersion,
          };
      let turnedOnVersions = recipe?.isMatch
        ? [...recipe?.turnedOnVersions]
        : [recipe?.defaultVersion, ...recipe?.turnedOnVersions];

      dispatch(
        setDetailsARecipe({
          ...recipe,
          defaultVersion,
          turnedOnVersions,
          tempVersionInfo: null,
        }),
      );

      dispatch(setOpenVersionTray(false));
    } catch (error) {
      notification("error", "Recipe not found");
      // router.push("/404");
    }
  };

  return { handleToGetARecipe, ...rest };
};

export default useToGetARecipe;
