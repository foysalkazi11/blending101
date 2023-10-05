import { useMutation } from "@apollo/client";
import notification from "components/utility/reactToastifyNotification";
import CREATE_NEW_USER from "gqlLib/user/mutations/createNewUser";
import { useAppDispatch } from "redux/hooks";
import { setDbUser } from "redux/slices/userSlice";

const useToGetExistingUserInfo = () => {
  const [getExistingUser] = useMutation(CREATE_NEW_USER);
  const dispatch = useAppDispatch();
  // handle to get existing user
  const handleToGetExistingUserInfo = async (email, provider: string = "") => {
    let userInfo: { email: string; provider?: string } = { email };
    if (provider) {
      userInfo = { ...userInfo, provider };
    }
    try {
      const { data } = await getExistingUser({
        variables: {
          data: userInfo,
        },
      });
      const currentUser = data?.createNewUser;

      dispatch(setDbUser(currentUser));
      return currentUser;
    } catch (error) {
      notification("error", "Failed to get existing user data");
    }
  };

  return handleToGetExistingUserInfo;
};

export default useToGetExistingUserInfo;
