import { useLazyQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FILTER_PLAN } from "../../graphql/Planner";
import { AllFilterType } from "../../type/filterType";
import notification from "../../components/utility/reactToastifyNotification";

const useToGetPlanByFilterCriteria = () => {
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state.user);
  const [filterPlan, { loading, data, error, ...rest }] = useLazyQuery(
    FILTER_PLAN,
    {
      fetchPolicy: "cache-and-network",
    },
  );

  const handleFilterPlan = async (
    allFilters: AllFilterType,
    page = 1,
    limit = 12,
  ) => {
    let blendTypesArr: string[] = [];
    let ingredientIds: string[] = [];
    let collectionsIds: string[] = [];
    let nutrientFiltersMap = [];
    let nutrientMatrixMap = [];
    let excludeIngredientIds = [];
    Object.entries(allFilters).forEach(([key, value]) => {
      if (key === "collectionIds") {
        value.forEach((filter) => collectionsIds.push(filter.id));
      }
      if (key === "blendTypes") {
        value.forEach((filter) => blendTypesArr.push(filter.id));
      }
      if (key === "includeIngredientIds") {
        value.forEach((filter: any) => {
          if (filter?.excludeIngredientIds) {
            excludeIngredientIds.push(filter.id);
          } else {
            ingredientIds.push(filter.id);
          }
        });
      }
      if (key === "nutrientFilters") {
        value?.forEach((filter: any) => {
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
        });
      }

      if (key === "nutrientMatrix") {
        value?.forEach((filter: any) => {
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
        });
      }
    });

    try {
      await filterPlan({
        variables: {
          data: {
            userId: dbUser?._id,
            includeIngredientIds: ingredientIds,
            nutrientFilters: nutrientFiltersMap,
            nutrientMatrix: nutrientMatrixMap,
            excludeIngredientIds,
            collectionsIds,
          },
          page,
          limit,
          userId: dbUser?._id,
        },
      });
    } catch (error) {
      notification("error", "Failed to filter plans");
      console.log(error?.message);
    }
  };

  return {
    handleFilterPlan,
    loading,
    data: data?.filterPlans,
    error,
    ...rest,
  };
};

export default useToGetPlanByFilterCriteria;
