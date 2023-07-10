import { useRouter } from "next/router";
import { AllFilterType } from "../../type/filterType";

const useToAddPlanFilterCriteriaWithUrl = () => {
  const router = useRouter();

  const handleAddFilterCriteriaWithUrl = (allFiltersForPlan: AllFilterType) => {
    let queryString = "";
    let isFirstParam = true;

    if (Object.values(allFiltersForPlan).flat().length) {
      Object.entries(allFiltersForPlan).forEach(([key, value]) => {
        const newValue = value?.map(({ origin, ...rest }) => rest);

        if (newValue && newValue.length) {
          if (isFirstParam) {
            queryString += `?${key}=${JSON.stringify(newValue)}`;
            isFirstParam = false;
          } else {
            queryString += `&${key}=${JSON.stringify(newValue)}`;
          }
        }
      });

      router.push(`/planner${queryString}`);
    } else {
      router.push(`/planner`);
    }
  };

  return handleAddFilterCriteriaWithUrl;
};

export default useToAddPlanFilterCriteriaWithUrl;
