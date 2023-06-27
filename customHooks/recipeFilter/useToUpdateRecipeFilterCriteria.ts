import { useAppDispatch } from "../../redux/hooks";
import { updateFilterCriteriaItem } from "../../redux/slices/filterRecipeSlice";
import {
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
} from "../../type/filterType";

const useToUpdateFilterCriteria = () => {
  const dispatch = useAppDispatch();

  const handleUpdateFilterCriteria = (obj: {
    filterCriteria?: FilterCriteriaOptions;
    value?: FilterCriteriaValue;
    updateStatus: FiltersUpdateCriteria;
  }) => {
    dispatch(updateFilterCriteriaItem(obj));
  };
  return handleUpdateFilterCriteria;
};

export default useToUpdateFilterCriteria;
