import { useMutation } from "@apollo/client";
import { Auth } from "aws-amplify";
import React, { useEffect } from "react";
import AContainer from "../../containers/A.container";
import CREATE_NEW_USER from "../../gqlLib/user/mutations/createNewUser";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDbUser, setUser } from "../../redux/slices/userSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const [createNewUser] = useMutation(CREATE_NEW_USER);

  const isCurrentUser = async () => {
    try {
      const {
        attributes: { email },
      } = await Auth.currentAuthenticatedUser();
      const { data } = await createNewUser({
        variables: {
          data: { email: email, provider: "email" },
        },
      });

      dispatch(setUser(email));
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
