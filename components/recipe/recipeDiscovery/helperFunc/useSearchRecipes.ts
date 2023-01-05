import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  updateAllFilterRecipes,
  updateShowFilterOrSearchRecipes,
} from "../../../../redux/slices/filterRecipeSlice";
import notification from "../../../utility/reactToastifyNotification";

const useHandleSearchRecipe = () => {
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state.user);
  const handleSearchRecipes = async (
    value: string,
    searchRecipe: any,
    pageNo: number = 1,
    limitParPage: number = 12,
  ) => {
    try {
      dispatch(updateShowFilterOrSearchRecipes(true));
      const { data } = await searchRecipe({
        variables: {
          userId: dbUser._id,
          searchTerm: value,
          page: pageNo,
          limit: limitParPage,
        },
      });

      dispatch(
        updateAllFilterRecipes({
          filterRecipes: [...data?.searchRecipes?.recipes],
          isFiltering: false,
          totalItems: 0,
        }),
      );
    } catch (error) {
      notification("error", "Failed to search recipes");
      dispatch(
        updateAllFilterRecipes({
          filterRecipes: [],
          isFiltering: false,
          totalItems: 0,
        }),
      );
    }
  };

  return handleSearchRecipes;
};

export default useHandleSearchRecipe;
