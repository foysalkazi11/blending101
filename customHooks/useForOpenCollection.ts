import { useAppDispatch } from "../redux/hooks";
import {
  setActiveRecipeId,
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../redux/slices/collectionSlice";
import { setReferenceOfRecipeUpdateFunc } from "../redux/slices/recipeSlice";
import { setOpenCollectionsTary } from "../redux/slices/sideTraySlice";
import { ReferenceOfRecipeUpdateFuncType } from "../type/recipeType";

const useForOpenCollectionTray = () => {
  const dispatch = useAppDispatch();

  const handleOpenCollectionTray = (
    id: string,
    collectionIds: string[],
    e: React.SyntheticEvent,
    updateDataFunc: ReferenceOfRecipeUpdateFuncType = () => {},
  ) => {
    e?.stopPropagation();
    dispatch(setSingleRecipeWithinCollecions(collectionIds));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    dispatch(setActiveRecipeId(id));
    dispatch(setReferenceOfRecipeUpdateFunc(updateDataFunc));
  };

  return handleOpenCollectionTray;
};

export default useForOpenCollectionTray;
