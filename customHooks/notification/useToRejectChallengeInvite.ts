import { useMutation } from "@apollo/client";
import useToUpdateShareNotification from "./useToUpdateShareNotification";
import notification from "../../components/utility/reactToastifyNotification";
import REJECT_CHALLENGE_SHARE from "../../gqlLib/notification/mutation/rejectChallengeShare";

const useToRejectChallengeInvite = () => {
  const [
    handleRejectChallengeInvite,
    { loading: rejectChallengeInviteLoading },
  ] = useMutation(REJECT_CHALLENGE_SHARE);
  const handleUpdateShareNotification = useToUpdateShareNotification();
  // reject challenge
  const functionRejectChallengeInvite = async (variables: {
    userId: string;
    token: string;
  }) => {
    const newVariables = {
      memberId: variables.userId,
      inviteId: variables.token,
    };

    try {
      const { data } = await handleRejectChallengeInvite({
        variables: newVariables,
      });
      const updateData = data?.rejectChallengeInvite;
      handleUpdateShareNotification(variables, updateData);
    } catch (error) {
      notification("error", "Failed to reject challenge invite");
    }
  };

  return { functionRejectChallengeInvite, rejectChallengeInviteLoading };
};

export default useToRejectChallengeInvite;
