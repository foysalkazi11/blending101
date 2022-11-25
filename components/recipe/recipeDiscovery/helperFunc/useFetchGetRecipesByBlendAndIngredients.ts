import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateAllFilterRecipes } from "../../../../redux/slices/filterRecipeSlice";
import notification from "../../../utility/reactToastifyNotification";

const useFetchGetRecipesByBlendAndIngredients = () => {
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state.user);

  const handleFilterRecipes = async (allFilters, filterRecipe) => {
    let blendTypesArr: string[] = [];
    let ingredientIds: string[] = [];
    let nutrientFiltersMap = [];
    let nutrientMatrixMap = [];
    allFilters.forEach((filter) => {
      if (filter.filterCriteria === "blendTypes") {
        blendTypesArr.push(filter.id);
      }
      if (filter.filterCriteria === "includeIngredientIds") {
        ingredientIds.push(filter.id);
      }
      if (filter.filterCriteria === "nutrientFilters") {
        const {
          id,
          name,
          //@ts-ignore
          between,
          //@ts-ignore
          category,
          //@ts-ignore
          greaterThan,
          //@ts-ignore
          lessThan,
          //@ts-ignore
          lessThanValue,
          //@ts-ignore
          greaterThanValue,
          //@ts-ignore
          betweenStartValue,
          //@ts-ignore
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
          //@ts-ignore
          between,
          //@ts-ignore
          greaterThan,
          //@ts-ignore
          lessThan,
          //@ts-ignore
          lessThanValue,
          //@ts-ignore
          greaterThanValue,
          //@ts-ignore
          betweenStartValue,
          //@ts-ignore
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
      const { data } = await filterRecipe({
        variables: {
          data: {
            userId: dbUser?._id,
            blendTypes: blendTypesArr,
            includeIngredientIds: ingredientIds,
            nutrientFilters: nutrientFiltersMap,
            nutrientMatrix: nutrientMatrixMap,
          },
        },
      });

      dispatch(
        updateAllFilterRecipes({
          filterRecipes: data?.filterRecipe || [],
          isFiltering: true,
        }),
      );
    } catch (error) {
      notification("error", "Failed to filter recipes");
      console.log(error?.message);
      dispatch(
        updateAllFilterRecipes({
          filterRecipes: [],
          isFiltering: true,
        }),
      );
    }
  };

  return handleFilterRecipes;
};

export default useFetchGetRecipesByBlendAndIngredients;
