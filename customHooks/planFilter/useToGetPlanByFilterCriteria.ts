import { useLazyQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FILTER_PLAN } from "../../modules/plan/plan.graphql";
import { AllFilterType } from "../../type/filterType";
import notification from "../../components/utility/reactToastifyNotification";
import { useUser } from "../../context/AuthProvider";

const useToGetPlanByFilterCriteria = () => {
  const user = useUser();
  const [filterPlan, { data, ...rest }] = useLazyQuery(
    FILTER_PLAN,
    // {
    //   fetchPolicy: "cache-and-network",
    // },
  );

  const handleFilterPlan = async (allFilters: AllFilterType, page = 1, limit = 12) => {
    const blendTypesArr: string[] = [];
    const includeIngredientIds: string[] = [];
    const collectionsIds: string[] = [];
    const nutrientFilters: any[] = [];
    const nutrientMatrix: any[] = [];
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
              includeIngredientIds.push(filter.id);
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

            nutrientFilters.push(arrangeValue);
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

            nutrientMatrix.push(arrangeValue);
          });
        }
      }
    });

    try {
      await filterPlan({
        variables: {
          data: {
            userId: user.id,
            includeIngredientIds,
            nutrientFilters,
            nutrientMatrix,
            excludeIngredientIds,
            collectionsIds,
            searchTerm,
          },
          page,
          limit,
          userId: user.id,
        },
      });
    } catch (error) {
      notification("error", "Failed to filter plans");
      console.log(error?.message);
    }
  };

  return {
    handleFilterPlan,
    data: data?.filterPlans,
    ...rest,
  };
};

export default useToGetPlanByFilterCriteria;
