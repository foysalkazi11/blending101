import { useUser } from "../../context/AuthProvider";
import client from "../../gqlLib/client";
import { GET_FEATURED_PLANS } from "../../modules/plan/plan.graphql";

type Props = (id: string, obj: object) => void;

const useToUpdateFeaturedPlanField = () => {
  const user = useUser();
  const memberId = user.id;
  const handleUpdateFeaturedPlanPlanField: Props = (id = "", obj = {}) => {
    const { getAllPopularPlans, getAllRecentPlans, getAllRecommendedPlans } = client.readQuery({
      query: GET_FEATURED_PLANS,
      variables: { limit: 8, memberId },
    });

    client.writeQuery({
      query: GET_FEATURED_PLANS,
      variables: { limit: 8, memberId },
      data: {
        getAllPopularPlans: {
          ...getAllPopularPlans,
          plans: getAllPopularPlans?.plans?.map((plan) => (plan?._id === id ? { ...plan, ...obj } : plan)),
        },
        getAllRecentPlans: {
          ...getAllRecentPlans,
          plans: getAllRecentPlans?.plans?.map((plan) => (plan?._id === id ? { ...plan, ...obj } : plan)),
        },
        getAllRecommendedPlans: {
          ...getAllRecentPlans,
          plans: getAllRecommendedPlans?.plans?.map((plan) => (plan?._id === id ? { ...plan, ...obj } : plan)),
        },
      },
    });
  };

  return handleUpdateFeaturedPlanPlanField;
};

export default useToUpdateFeaturedPlanField;
