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

  const handleToGetARecipeVersion = async (versionId: string) => {
    try {
      const { data } = await getARecipeVersion({
        variables: { versionId },
      });

      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          defaultVersion: {
            ...detailsARecipe?.defaultVersion,
            ...data?.getARecipeVersion,
          },
          isVersionActive: true,
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
