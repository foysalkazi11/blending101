import { useLazyQuery } from "@apollo/client";
import GET_A_RECIPE_VERSION from "../gqlLib/versions/query/getARecipeVersion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { setOpenVersionTray } from "../redux/slices/versionTraySlice";
import { RecipeVersionType } from "../type/recipeVersionType";

const useToGetARecipeVersion = () => {
  const dispatch = useAppDispatch();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const [
    getARecipeVersion,
    { data: recipeVersionData, loading: recipeVersionLoading },
  ] = useLazyQuery(GET_A_RECIPE_VERSION, { fetchPolicy: "network-only" });

  const handleToGetARecipeVersion = async (id: string) => {
    try {
      const { data } = await getARecipeVersion({
        variables: { versionId: id },
      });
      const { _id, recipeId, description, ...rest }: RecipeVersionType =
        data?.getARecipeVersion;
      const obj = {
        _id: recipeId,
        versionId: _id,
        versionDiscription: description,
        isVersionActive: true,
        ...rest,
      };
      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          ...obj,
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
