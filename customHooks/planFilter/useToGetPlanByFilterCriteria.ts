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
    const blendTypesArr: string[] = [];
    const ingredientIds: string[] = [];
    const collectionsIds: string[] = [];
    const nutrientFiltersMap: any[] = [];
    const nutrientMatrixMap: any[] = [];
    const excludeIngredientIds: string[] = [];
    let searchTerm = "";

    Object.entries(allFilters).forEach(([key, value]) => {
      if (typeof value === "string" && key === "searchTerm") {
        searchTerm = value;
      } else if (Array.isArray(value) && value.length) {
        if (key === "collectionIds") {
          collectionsIds.push(...value.map((filter: any) => filter.id));
        } else if (key === "blendTypes") {
          blendTypesArr.push(...value.map((filter: any) => filter.id));
        } else if (key === "includeIngredientIds") {
          value.forEach((filter: any) => {
            if (filter?.excludeIngredientIds) {
              excludeIngredientIds.push(filter.id);
            } else {
              ingredientIds.push(filter.id);
            }
          });
        } else if (key === "nutrientFilters") {
          value.forEach((filter: any) => {
            const {
              id,
              between,
              category,
              greaterThan,
              lessThan,
              lessThanValue,
              greaterThanValue,
              betweenStartValue,
              betweenEndValue,
            } = filter;

            const arrangeValue = {
              between,
              category: category.toLowerCase(),
              greaterThan,
              lessThan,
              nutrientId: id,
              value: lessThan ? lessThanValue : greaterThanValue,
              value1: betweenStartValue,
              value2: betweenEndValue,
            };

            nutrientFiltersMap.push(arrangeValue);
          });
        } else if (key === "nutrientMatrix") {
          value.forEach((filter: any) => {
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

            const arrangeValue = {
              matrixName: name.toLowerCase(),
              between,
              greaterThan,
              lessThan,
              value: lessThan ? lessThanValue : greaterThanValue,
              value1: betweenStartValue,
              value2: betweenEndValue,
            };

            nutrientMatrixMap.push(arrangeValue);
          });
        }
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
            searchTerm,
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
