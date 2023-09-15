import { useUser } from "../../../../context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateAllFilterRecipes, updateShowFilterOrSearchRecipes } from "../../../../redux/slices/filterRecipeSlice";
import notification from "../../../utility/reactToastifyNotification";

const useHandleSearchRecipe = () => {
  const dispatch = useAppDispatch();
  const user = useUser();
  const { allFilterRecipes } = useAppSelector((state) => state?.filterRecipe);

  const handleSearchRecipes = async (
    setSearchRecipes: React.Dispatch<
      React.SetStateAction<{
        recipes: any[];
        totalRecipes: number;
      }>
    >,
    value: string,
    searchRecipe: any,
    pageNo: number = 1,
    limitParPage: number = 12,
    isNewItems: boolean = true,
  ) => {
    try {
      // dispatch(updateShowFilterOrSearchRecipes(true));
      // if (isNewItems) {
      //   dispatch(
      //     updateAllFilterRecipes({
      //       filterRecipes: [],
      //       isFiltering: false,
      //       totalItems: 0,
      //     }),
      //   );
      // }
      const { data } = await searchRecipe({
        variables: {
          userId: user.id,
          searchTerm: value,
          page: pageNo,
          limit: limitParPage,
        },
      });
      setSearchRecipes((pre) => ({
        recipes: pageNo === 1 ? data?.searchRecipes?.recipes : [...pre.recipes, ...data?.searchRecipes?.recipes],
        totalRecipes: data?.searchRecipes.totalRecipes,
      }));
      // dispatch(
      //   updateAllFilterRecipes({
      //     filterRecipes: isNewItems
      //       ? [...data?.searchRecipes?.recipes]
      //       : [
      //           ...allFilterRecipes?.filterRecipes,
      //           ...data?.searchRecipes?.recipes,
      //         ],
      //     isFiltering: false,
      //     totalItems: data?.searchRecipes?.totalRecipes,
      //   }),
      // );
    } catch (error) {
      notification("error", "Failed to search recipes");
      // dispatch(
      //   updateAllFilterRecipes({
      //     filterRecipes: [],
      //     isFiltering: false,
      //     totalItems: 0,
      //   }),
      // );
    }
  };

  return handleSearchRecipes;
};

export default useHandleSearchRecipe;
