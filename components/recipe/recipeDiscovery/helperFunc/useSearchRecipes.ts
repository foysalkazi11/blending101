import { useLazyQuery } from "@apollo/client";
import { useUser } from "../../../../context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateAllFilterRecipes, updateShowFilterOrSearchRecipes } from "../../../../redux/slices/filterRecipeSlice";
import notification from "../../../utility/reactToastifyNotification";
import SEARCH_RECIPE from "gqlLib/recipes/queries/searchRecipe";

const useHandleSearchRecipe = () => {
  const dispatch = useAppDispatch();
  const user = useUser();
  const { allFilterRecipes } = useAppSelector((state) => state?.filterRecipe);
  const [searchRecipe, restState] = useLazyQuery(SEARCH_RECIPE, {
    // fetchPolicy: "cache-and-network",
  });

  const handleSearchRecipes = async (
    value: string,
    pageNo: number = 1,
    limitParPage: number = 12,
    isNewItems: boolean = true,
  ) => {
    try {
      dispatch(updateShowFilterOrSearchRecipes(true));
      if (isNewItems) {
        dispatch(
          updateAllFilterRecipes({
            filterRecipes: [],
            isFiltering: false,
            totalItems: 0,
          }),
        );
      }
      const { data } = await searchRecipe({
        variables: {
          userId: user.id,
          searchTerm: value,
          page: pageNo,
          limit: limitParPage,
        },
      });
      // setSearchRecipes((pre) => ({
      //   recipes: pageNo === 1 ? data?.searchRecipes?.recipes : [...pre.recipes, ...data?.searchRecipes?.recipes],
      //   totalRecipes: data?.searchRecipes.totalRecipes,
      // }));
      dispatch(
        updateAllFilterRecipes({
          filterRecipes: isNewItems
            ? [...data?.searchRecipes?.recipes]
            : [...allFilterRecipes?.filterRecipes, ...data?.searchRecipes?.recipes],
          isFiltering: false,
          totalItems: data?.searchRecipes?.totalRecipes,
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

  return { handleSearchRecipes, ...restState };
};

export default useHandleSearchRecipe;
