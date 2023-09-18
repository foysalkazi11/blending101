import { useUser } from "../../context/AuthProvider";
import client from "../../gqlLib/client";
import { GET_ALL_PLANS } from "../../modules/plan/plan.graphql";

type Props = (id: string, obj: object, limit?: number, page?: number) => void;

const useToUpdateGlobalPlans = () => {
  const memberId = useUser().id;
  const handleUpdateGlobalPlansField: Props = (id = "", obj = {}, limit = 10, page = 1) => {
    const { getAllGlobalPlans } = client.readQuery({
      query: GET_ALL_PLANS,
      variables: { query: "", memberId, limit, page },
    });
    client.writeQuery({
      query: GET_ALL_PLANS,
      variables: { query: "", memberId, limit, page },
      data: {
        getAllGlobalPlans: {
          ...getAllGlobalPlans,
          plans: getAllGlobalPlans?.plans?.map((plan) => (plan?._id === id ? { ...plan, ...obj } : plan)),
        },
      },
    });
  };

  return handleUpdateGlobalPlansField;
};

export default useToUpdateGlobalPlans;
