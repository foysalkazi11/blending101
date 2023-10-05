import { setOpenFilterTray } from "redux/slices/sideTraySlice";
import { useAppDispatch } from "../../redux/hooks";
import { updateFilterCriteriaItem } from "../../redux/slices/filterRecipeSlice";
import { FilterCriteriaOptions, FilterCriteriaValue, FiltersUpdateCriteria } from "../../type/filterType";
import { useRouter } from "next/router";

const useToUpdateFilterCriteria = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleUpdateFilterCriteria = (obj: {
    filterCriteria?: FilterCriteriaOptions;
    value?: FilterCriteriaValue;
    updateStatus: FiltersUpdateCriteria;
  }) => {
    dispatch(updateFilterCriteriaItem(obj));
    // const path = router.asPath;

    // if (path !== "/recipe/filterRecipe/") {
    //   dispatch(setOpenFilterTray(false));
    //   router.push("/recipe/filterRecipe");
    // }
  };
  return handleUpdateFilterCriteria;
};

export default useToUpdateFilterCriteria;
