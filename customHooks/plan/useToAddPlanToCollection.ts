import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { ADD_TO_LAST_MODIFIED_PLAN_COLLECTION } from "../../modules/plan/plan.graphql";
import { useAppDispatch } from "../../redux/hooks";
import {
  PlanComeFromType,
  setIsActivePlanForCollection,
  updateLastModifiedPlanCollection,
} from "../../redux/slices/Planner.slice";
import useToUpdatePlanFields from "./useToUpdatePlanFields";

const useToAddPlanToCollection = () => {
  const dispatch = useAppDispatch();
  const handleToUpdatePlanFields = useToUpdatePlanFields();
  let timeOut;
  const [addToBlogCollection] = useMutation(ADD_TO_LAST_MODIFIED_PLAN_COLLECTION, { fetchPolicy: "network-only" });
  const handleToAddPlanToCollection = async (
    planId: string = "",
    memberId: string = "",
    setOpenLastModifiedBlogCollectionModal: (arg: boolean) => void = () => {},
    planComeFrom: PlanComeFromType = "list",
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

      dispatch(updateLastModifiedPlanCollection(addToLastModifiedPlanCollection));
      dispatch(
        setIsActivePlanForCollection({
          id: planId,
          collectionIds: [addToLastModifiedPlanCollection?._id],
          planComeFrom,
        }),
      );
      const updateObj = {
        planCollections: [addToLastModifiedPlanCollection?._id],
      };
      handleToUpdatePlanFields(planId, updateObj, planComeFrom);

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
