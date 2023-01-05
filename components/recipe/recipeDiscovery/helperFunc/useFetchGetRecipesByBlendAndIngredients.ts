import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  updateAllFilterRecipes,
  updateShowFilterOrSearchRecipes,
} from "../../../../redux/slices/filterRecipeSlice";
import notification from "../../../utility/reactToastifyNotification";

const useFetchGetRecipesByBlendAndIngredients = () => {
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state.user);
  const { allFilterRecipes } = useAppSelector((state) => state?.filterRecipe);

  const handleFilterRecipes = async (
    allFilters,
    filterRecipe,
    page = 1,
    limit = 12,
    newLength: boolean = true,
  ) => {
    let blendTypesArr: string[] = [];
    let ingredientIds: string[] = [];
    let nutrientFiltersMap = [];
    let nutrientMatrixMap = [];
    let excludeIngredientIds = [];
    allFilters.forEach((filter: any) => {
      if (filter.filterCriteria === "blendTypes") {
        blendTypesArr.push(filter.id);
      }
      if (filter.filterCriteria === "includeIngredientIds") {
        if (filter.excludeIngredientIds) {
          excludeIngredientIds.push(filter.id);
        } else {
          ingredientIds.push(filter.id);
        }
      }
      if (filter.filterCriteria === "nutrientFilters") {
        const {
          id,
          name,
          between,
          category,
          greaterThan,
          lessThan,
          lessThanValue,
          greaterThanValue,
          betweenStartValue,
          betweenEndValue,
        } = filter;
        let arrangeValue = {
          beetween: between,
          category: category.toLowerCase(),
          greaterThan,
          lessThan,
          nutrientId: id,
          value: 0,
          value1: 0,
          value2: 0,
        };
        if (lessThan) {
          arrangeValue = {
            ...arrangeValue,
            value: lessThanValue,
          };
        }
        if (greaterThan) {
          arrangeValue = {
            ...arrangeValue,
            value: greaterThanValue,
          };
        }
        if (between) {
          arrangeValue = {
            ...arrangeValue,
            value1: betweenStartValue,
            value2: betweenEndValue,
          };
        }
        nutrientFiltersMap.push(arrangeValue);
      }

      if (filter.filterCriteria === "nutrientMatrix") {
        const {
          id,
          name,
          between,
          greaterThan,
          lessThan,
          lessThanValue,
          greaterThanValue,
          betweenStartValue,
          betweenEndValue,
        } = filter;
        let arrangeValue = {
          matrixName: name.toLowerCase(),
          beetween: between,
          greaterThan,
          lessThan,
          value: 0,
          value1: 0,
          value2: 0,
        };
        if (lessThan) {
          arrangeValue = {
            ...arrangeValue,
            value: lessThanValue,
          };
        }
        if (greaterThan) {
          arrangeValue = {
            ...arrangeValue,
            value: greaterThanValue,
          };
        }
        if (between) {
          arrangeValue = {
            ...arrangeValue,
            value1: betweenStartValue,
            value2: betweenEndValue,
          };
        }
        nutrientMatrixMap.push(arrangeValue);
      }
    });

    try {
      dispatch(updateShowFilterOrSearchRecipes(true));
      const { data } = await filterRecipe({
        variables: {
          data: {
            userId: dbUser?._id,
            blendTypes: blendTypesArr,
            includeIngredientIds: ingredientIds,
            nutrientFilters: nutrientFiltersMap,
            nutrientMatrix: nutrientMatrixMap,
            excludeIngredientIds,
          },
          page,
          limit,
        },
      });
      dispatch(
        updateAllFilterRecipes({
          filterRecipes: newLength
            ? [...data?.filterRecipe?.recipes]
            : [
                ...allFilterRecipes.filterRecipes,
                ...data?.filterRecipe?.recipes,
              ],
          isFiltering: false,
          totalItems: data?.filterRecipe?.totalRecipes,
        }),
      );
    } catch (error) {
      notification("error", "Failed to filter recipes");
      console.log(error?.message);
      dispatch(
        updateAllFilterRecipes({
          filterRecipes: [],
          isFiltering: false,
          totalItems: 0,
        }),
      );
    }
  };

  return handleFilterRecipes;
};

export default useFetchGetRecipesByBlendAndIngredients;
