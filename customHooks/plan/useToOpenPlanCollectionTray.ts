import { useAppDispatch } from "../../redux/hooks";
import {
  setIsActivePlanForCollection,
  setIsOpenPlanCollectionTray,
} from "../../redux/slices/Planner.slice";

const useToOpenPlanCollectionTray = () => {
  const dispatch = useAppDispatch();
  const handleOpenCollectionTray = (
    id: string,
    collectionIds: string[],
    typeOfPlan: "list" | "details",
  ) => {
    dispatch(setIsActivePlanForCollection({ id, collectionIds, typeOfPlan }));
    dispatch(setIsOpenPlanCollectionTray(true));
  };

  return handleOpenCollectionTray;
};

export default useToOpenPlanCollectionTray;
