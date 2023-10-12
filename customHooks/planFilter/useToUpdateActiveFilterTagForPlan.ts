import { useAppDispatch } from "../../redux/hooks";
import { updateActiveFilterTagForPlan } from "../../redux/slices/planFilterSlice";
import { ActiveSectionType, FilterCriteriaOptions } from "../../type/filterType";

const useToUpdateActiveFilterTagForPlan = () => {
  const dispatch = useAppDispatch();
  const handleUpdateActiveFilterTagForPlan = (
    activeSection: ActiveSectionType,
    filterCriteria: FilterCriteriaOptions,
    activeTab: string,
    childTab: string,
    id: string,
  ) => {
    dispatch(
      updateActiveFilterTagForPlan({
        activeSection,
        filterCriteria,
        activeTab,
        childTab: childTab || activeTab,
        id,
      }),
    );
  };

  return handleUpdateActiveFilterTagForPlan;
};

export default useToUpdateActiveFilterTagForPlan;
