import { useRouter } from "next/router";
import { AllFilterType } from "../../type/filterType";

const useToAddPlanFilterCriteriaWithUrl = () => {
  const router = useRouter();

  const handleAddFilterCriteriaWithUrl = (allFiltersForPlan: AllFilterType) => {
    const queryStringParams = [];

    Object.entries(allFiltersForPlan).forEach(([key, value]) => {
      if (value && value.length) {
        const newValue =
          typeof value === "string"
            ? value
            : value.map(({ origin, ...rest }) => rest);
        queryStringParams.push(`${key}=${JSON.stringify(newValue)}`);
      }
    });

    const queryString = queryStringParams.length
      ? `?${queryStringParams.join("&")}`
      : "";

    router.push(`/planner${queryString}`);
  };

  return handleAddFilterCriteriaWithUrl;
};

export default useToAddPlanFilterCriteriaWithUrl;
