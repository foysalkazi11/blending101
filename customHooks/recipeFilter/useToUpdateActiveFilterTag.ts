import { useAppDispatch } from "../../redux/hooks";
import { updateActiveFilterTag } from "../../redux/slices/filterRecipeSlice";
import {
  ActiveSectionType,
  FilterCriteriaOptions,
} from "../../type/filterType";

const useToUpdateActiveFilterTag = () => {
  const dispatch = useAppDispatch();
  const handleUpdateActiveFilterTag = (
    activeSection: ActiveSectionType,
    filterCriteria: FilterCriteriaOptions,
    activeTab: string,
    childTab?: string,
  ) => {
    dispatch(
      updateActiveFilterTag({
        activeSection,
        filterCriteria,
        activeTab,
        childTab: childTab || activeTab,
      }),
    );
  };

  return handleUpdateActiveFilterTag;
};

export default useToUpdateActiveFilterTag;
