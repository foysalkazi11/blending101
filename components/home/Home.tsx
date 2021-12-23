import { useMutation } from "@apollo/client";
import { Auth } from "aws-amplify";
import React, { useEffect } from "react";
import AContainer from "../../containers/A.container";
import CREATE_NEW_USER from "../../gqlLib/user/mutations/createNewUser";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDbUser, setUser } from "../../redux/slices/userSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { user, provider } = useAppSelector((state) => state?.user);
  const [createNewUser] = useMutation(CREATE_NEW_USER);

  const isCurrentUser = async () => {
    try {
      let userEmail = "";
      let provider = "";
      const user = await Auth.currentAuthenticatedUser();
      if (user?.attributes) {
        const {
          attributes: { email },
        } = await Auth.currentAuthenticatedUser();
        userEmail = email;
        provider = "email";
      } else {
        const {
          signInUserSession: {
            idToken: {
              payload: { email, given_name, identities },
            },
          },
        } = user;
        userEmail = email;
        provider = identities?.[0]?.providerName;
      }

      const { data } = await createNewUser({
        variables: {
          data: { email: userEmail, provider },
        },
      });

      dispatch(setUser(userEmail));
      dispatch(setDbUser(data?.createNewUser));
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (!user) {
      isCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AContainer
      headerTitle="Home"
      logo={true}
      showRighTray={true}
      showSidebar={false}
      headerFullWidth={true}
    >
      Home
    </AContainer>
  );
};

export default Home;
