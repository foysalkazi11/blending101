import { useUser } from "../../context/AuthProvider";
import client from "../../gqlLib/client";
import { GET_PLAN } from "../../modules/plan/plan.graphql";

type Props = (id: string, obj: object) => void;

const useToUpdatePlanDetailsField = () => {
  const memberId = useUser().id;
  const handleUpdatePlanDetailsField: Props = async (id = "", obj = {}) => {
    const { getAPlan } = client.readQuery({
      query: GET_PLAN,
      variables: { planId: id, token: "", memberId },
    });

    client.writeQuery({
      query: GET_PLAN,
      variables: { planId: id },
      data: {
        getAPlan: {
          ...getAPlan,
          plan: { ...getAPlan?.plan, ...obj },
        },
      },
    });
  };

  return handleUpdatePlanDetailsField;
};

export default useToUpdatePlanDetailsField;
