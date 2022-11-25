import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateAllFilterRecipes } from "../../../../redux/slices/filterRecipeSlice";
import notification from "../../../utility/reactToastifyNotification";

const useHandleSearchRecipe = () => {
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state.user);
  const handleSearchRecipes = async (value: string, searchRecipe: any) => {
    try {
      const { data } = await searchRecipe({
        variables: { userId: dbUser._id, searchTerm: value },
      });

      dispatch(
        updateAllFilterRecipes({
          filterRecipes: data?.searchRecipes || [],
          isFiltering: true,
        }),
      );
    } catch (error) {
      notification("error", "Failed to search recipes");
      dispatch(
        updateAllFilterRecipes({
          filterRecipes: [],
          isFiltering: true,
        }),
      );
    }
  };

  return handleSearchRecipes;
};

export default useHandleSearchRecipe;
