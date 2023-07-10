import { useAppDispatch } from "../../redux/hooks";
import { updateFilterCriteriaItemForPlan } from "../../redux/slices/planFilterSlice";
import {
  AllFilterType,
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
} from "../../type/filterType";

const useToUpdateFilterCriteriaForPlan = () => {
  const dispatch = useAppDispatch();

  const handleUpdateFilterCriteriaForPlan = (obj: {
    filterCriteria?: FilterCriteriaOptions;
    value?: FilterCriteriaValue;
    updateStatus: FiltersUpdateCriteria;
    queryFilters?: AllFilterType;
  }) => {
    dispatch(updateFilterCriteriaItemForPlan(obj));
  };

  return handleUpdateFilterCriteriaForPlan;
};

export default useToUpdateFilterCriteriaForPlan;
