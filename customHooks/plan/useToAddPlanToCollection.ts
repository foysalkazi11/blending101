import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { ADD_TO_LAST_MODIFIED_PLAN_COLLECTION } from "../../graphql/Planner";
import { useAppDispatch } from "../../redux/hooks";
import {
  setIsActivePlanForCollection,
  updateLastModifiedPlanCollection,
} from "../../redux/slices/Planner.slice";
import useToUpdatePlanField from "./useToUpdatePlanField";
import useToUpdatePlanDetailsField from "./useToUpdatePlanDetailsField";

const useToAddPlanToCollection = () => {
  const dispatch = useAppDispatch();
  const handleUpdatePlanField = useToUpdatePlanField();
  const handleUpdatePlanDetailsField = useToUpdatePlanDetailsField();
  let timeOut;
  const [addToBlogCollection] = useMutation(
    ADD_TO_LAST_MODIFIED_PLAN_COLLECTION,
    { fetchPolicy: "network-only" },
  );
  const handleToAddPlanToCollection = async (
    planId: string = "",
    memberId: string = "",
    setOpenLastModifiedBlogCollectionModal: (arg: boolean) => void = () => {},
    typeOfPlan: "list" | "details" = "list",
  ) => {
    try {
      const {
        data: { addToLastModifiedPlanCollection },
      } = await addToBlogCollection({
        variables: {
          planId,
          memberId,
        },
      });

      dispatch(
        updateLastModifiedPlanCollection(addToLastModifiedPlanCollection),
      );
      dispatch(
        setIsActivePlanForCollection({
          id: planId,
          collectionIds: [addToLastModifiedPlanCollection?._id],
          typeOfPlan,
        }),
      );
      const updateObj = {
        planCollections: [addToLastModifiedPlanCollection?._id],
      };
      typeOfPlan === "list"
        ? handleUpdatePlanField(planId, updateObj)
        : handleUpdatePlanDetailsField(planId, updateObj);
      setOpenLastModifiedBlogCollectionModal(true);
      timeOut = setTimeout(() => {
        setOpenLastModifiedBlogCollectionModal(false);
      }, 5000);
    } catch (error) {}
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, [timeOut]);

  return handleToAddPlanToCollection;
};

export default useToAddPlanToCollection;
