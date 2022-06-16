import { useAppDispatch } from "../redux/hooks";
import {
  setActiveRecipeId,
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../redux/slices/sideTraySlice";

const useForOpenCollectionTray = () => {
  const dispatch = useAppDispatch();

  const handleOpenCollectionTray = (
    id: string,
    collectionIds: string[],
    e: React.SyntheticEvent,
  ) => {
    e?.stopPropagation();
    dispatch(setSingleRecipeWithinCollecions(collectionIds));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    dispatch(setActiveRecipeId(id));
  };

  return handleOpenCollectionTray;
};

export default useForOpenCollectionTray;
