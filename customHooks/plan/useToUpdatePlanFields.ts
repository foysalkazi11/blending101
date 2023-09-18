import { PlanComeFromType } from "../../redux/slices/Planner.slice";
import useToUpdateFeaturedPlanField from "./useToUpdatePlanFieldFeaturedPlans";
import useToUpdatePlanDetailsField from "./useToUpdatePlanDetailsField";
import useToUpdateGlobalPlans from "./useToUpdateGlobalPlans";

const useToUpdatePlanFields = () => {
  const handleUpdateFeaturedPlanPlanField = useToUpdateFeaturedPlanField();
  const handleUpdatePlanDetailsField = useToUpdatePlanDetailsField();
  const handleUpdateGlobalPlansField = useToUpdateGlobalPlans();
  const handleToUpdatePlanFields = async (
    planId: string = "",
    updateObj: { [key: string]: any } = {},
    planComeFrom: PlanComeFromType = "list",
  ) => {
    try {
      switch (planComeFrom) {
        case "list":
          handleUpdateFeaturedPlanPlanField(planId, updateObj);
          break;
        case "details":
          handleUpdatePlanDetailsField(planId, updateObj);
          break;
        case "globalPlans":
          handleUpdateGlobalPlansField(planId, updateObj);
          break;
        case "homePage":
          handleUpdateGlobalPlansField(planId, updateObj, 8);
          break;
        default:
          handleUpdateFeaturedPlanPlanField(planId, updateObj);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return handleToUpdatePlanFields;
};

export default useToUpdatePlanFields;
