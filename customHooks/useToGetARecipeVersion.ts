import { useLazyQuery } from "@apollo/client";
import GET_A_RECIPE_VERSION from "../gqlLib/versions/query/getARecipeVersion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { setOpenVersionTray } from "../redux/slices/versionTraySlice";
import { RecipeVersionType } from "../type/recipeVersionType";

const useToGetARecipeVersion = () => {
  const dispatch = useAppDispatch();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const [getARecipeVersion, { ...rest }] = useLazyQuery(GET_A_RECIPE_VERSION, {
    fetchPolicy: "network-only",
  });

  const handleToGetARecipeVersion = async (
    versionId: string,
    isOriginalVersion: boolean = false,
  ) => {
    try {
      const { data } = await getARecipeVersion({
        variables: { versionId },
      });
      const { _id, ...rest } = data?.getARecipeVersion;

      let obj = isOriginalVersion
        ? {
            ...detailsARecipe?.defaultVersion,
            ...rest,
            postfixTitle: detailsARecipe?.recipeId?.name || "",
            description: detailsARecipe?.recipeId?.description || "",
            tempVersionId: _id,
          }
        : {
            ...detailsARecipe?.defaultVersion,
            ...rest,
            tempVersionId: _id,
          };

      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          isVersionActive: true,
          defaultVersion: obj,
        }),
      );
      dispatch(setOpenVersionTray(false));
    } catch (error) {
      console.log(error);
    }
  };

  return handleToGetARecipeVersion;
};

export default useToGetARecipeVersion;
