import { useMutation } from "@apollo/client";
import notification from "../../components/utility/reactToastifyNotification";
import { ACCEPT_CHALLENGE } from "../../modules/challenge/challenge.graphql";
import client from "../../gqlLib/client";
import GET_SHARE_NOTIFICATION from "../../gqlLib/notification/query/getShareNotification";

const useToAcceptChallengeInvite = () => {
  const [handleAcceptChallengeInvite, { loading: acceptChallengeInviteLoading }] = useMutation(ACCEPT_CHALLENGE);
  const functionAcceptChallengeInvite = async (variables: { userId: string; token: string }) => {
    try {
      const { data } = await handleAcceptChallengeInvite({
        variables: { ...variables, user: variables.userId },
      });

      const id = data?.acceptChallenge;
      const { getShareNotification } = client.readQuery({
        query: GET_SHARE_NOTIFICATION,
        variables,
      });

      client.writeQuery({
        query: GET_SHARE_NOTIFICATION,
        variables,
        data: {
          getShareNotification: {
            ...getShareNotification,
            shareNotifications: getShareNotification?.shareNotifications?.filter(
              (notification) => notification?.shareData?.entityId._id !== id,
            ),
            totalNotification: getShareNotification?.totalNotification - 1,
          },
        },
      });
      notification("success", "Accept challenge successfully");
    } catch (error) {
      notification("error", "Failed to accept challenge");
    }
  };
  return { functionAcceptChallengeInvite, acceptChallengeInviteLoading };
};

export default useToAcceptChallengeInvite;
