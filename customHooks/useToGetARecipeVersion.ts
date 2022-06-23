import { useLazyQuery } from "@apollo/client";
import GET_A_RECIPE_VERSION from "../gqlLib/versions/query/getARecipeVersion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { RecipeVersionType } from "../type/recipeVersionType";

const useToGetARecipeVersion = () => {
  const dispatch = useAppDispatch();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const [
    getARecipeVersion,
    { data: recipeVersionData, loading: recipeVersionLoading },
  ] = useLazyQuery(GET_A_RECIPE_VERSION);

  const handleToGetARecipeVersion = async (id: string) => {
    try {
      const { data } = await getARecipeVersion({
        variables: { versionId: id },
      });

      const { _id, recipeId, ...rest }: RecipeVersionType =
        data?.getARecipeVersion;
      const obj = {
        _id: recipeId,
        versionId: _id,
        ...rest,
      };
      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          ...obj,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return handleToGetARecipeVersion;
};

export default useToGetARecipeVersion;
