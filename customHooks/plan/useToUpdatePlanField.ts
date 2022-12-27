import client from "../../gqlLib/client";
import { GET_FEATURED_PLANS } from "../../graphql/Planner";
import { useAppSelector } from "../../redux/hooks";

type Props = (id: string, obj: object) => void;

const useToUpdatePlanField = () => {
  const memberId = useAppSelector((state) => state?.user?.dbUser?._id || "");
  const handleUpdatePlanField: Props = (id = "", obj = {}) => {
    const { getAllPopularPlans, getAllRecentPlans, getAllRecommendedPlans } =
      client.readQuery({
        query: GET_FEATURED_PLANS,
        variables: { limit: 8, memberId },
      });

    client.writeQuery({
      query: GET_FEATURED_PLANS,
      variables: { limit: 8, memberId },
      data: {
        getAllPopularPlans: getAllPopularPlans?.map((plan) =>
          plan?._id === id ? { ...plan, ...obj } : plan,
        ),
        getAllRecentPlans: getAllRecentPlans?.map((plan) =>
          plan?._id === id ? { ...plan, ...obj } : plan,
        ),
        getAllRecommendedPlans: getAllRecommendedPlans?.map((plan) =>
          plan?._id === id ? { ...plan, ...obj } : plan,
        ),
      },
    });
  };

  return handleUpdatePlanField;
};

export default useToUpdatePlanField;
