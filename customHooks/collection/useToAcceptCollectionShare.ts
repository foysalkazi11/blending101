import { useMutation } from "@apollo/client";
import notification from "../../components/utility/reactToastifyNotification";
import ACCEPT_COLLECTION_SHARE from "../../gqlLib/notification/mutation/acceptCollectionShare";
import useToUpdateShareNotification from "../notification/useToUpdateShareNotification";
import { useRouter } from "next/router";

const useToAcceptCollectionShare = () => {
  const [
    handleAcceptCollectionShare,
    { loading: acceptCollectionShareLoading },
  ] = useMutation(ACCEPT_COLLECTION_SHARE);
  const handleUpdateShareNotification = useToUpdateShareNotification();
  const router = useRouter();
  const functionAcceptCollectionShare = async (
    variables: {
      userId: string;
      token: string;
    },
    isComeFromDetailsView: boolean = false,
  ) => {
    try {
      const { data } = await handleAcceptCollectionShare({ variables });
      const updateData = data?.acceptCollectionShare;
      handleUpdateShareNotification(variables, updateData);
      notification("success", "Collection added to shared with me collection");
      if (isComeFromDetailsView) {
        router.push("/recipe_discovery");
      }
    } catch (error) {
      notification("error", "Failed accept Collection share");
      // throw error
    }
  };
  return { functionAcceptCollectionShare, acceptCollectionShareLoading };
};

export default useToAcceptCollectionShare;
