import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateFilterCriteriaItemForPlan } from "../../redux/slices/planFilterSlice";
import {
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
} from "../../type/filterType";

const useToUpdateFilterCriteriaForPlan = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { allFiltersForPlan } = useAppSelector((state) => state?.planFilter);

  const handleUpdateFilterCriteriaForPlan = (obj: {
    filterCriteria?: FilterCriteriaOptions;
    value?: FilterCriteriaValue;
    updateStatus: FiltersUpdateCriteria;
  }) => {
    dispatch(updateFilterCriteriaItemForPlan(obj));
    // router.push({
    //   pathname: "/planner",
    //   query: {
    //     filterCriteria: JSON.stringify(allFiltersForPlan),
    //   },
    // });
  };
  return handleUpdateFilterCriteriaForPlan;
};

export default useToUpdateFilterCriteriaForPlan;
