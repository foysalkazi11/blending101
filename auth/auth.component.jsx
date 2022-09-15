import React, { useEffect, useState, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setActiveUser } from "../redux/users/user.action";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Auth } from "aws-amplify";
import { setDbUser, setProvider, setUser } from "../redux/slices/userSlice";
import { useMutation } from "@apollo/client";
import CREATE_NEW_USER from "../gqlLib/user/mutations/createNewUser";
import { setLoading } from "../redux/slices/utilitySlice";
import Loader from "../component/atoms/Loader/loader.component";

// INITIALIZE 1: CREATE AUTH CONTEXT
const AuthContext = createContext();

// CONTEXT WRAPPER: PROVIDES AUTH
function AuthProvider({ children, activeUser }) {
  // INITIALIZE 2: DEFINE STATES

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const { user } = useAppSelector((state) => state?.user);
  const [createNewUser, { loading: userLoading }] =
    useMutation(CREATE_NEW_USER);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // SETS USER WHEN ACTIVE USER IS DETECTED

  // EXTRACT PAGE
  const page = router.pathname;

  const isCurrentUser = async () => {
    setLoading(true);
    try {
      let userEmail = "";
      let provider = "";
      const user = await Auth.currentAuthenticatedUser();
      console.log("user", user);
      if (user?.attributes) {
        const {
          attributes: { email },
        } = user;
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
        provider = identities?.[0]?.providerName?.toLowerCase();
      }

      const { data } = await createNewUser({
        variables: {
          data: { email: userEmail, provider },
        },
      });
      dispatch(setUser(userEmail));
      dispatch(setDbUser(data?.createNewUser));
      dispatch(setProvider(provider));
      setActive(true);
    } catch (error) {
      setLoading(false);
      if (
        !user &&
        process.browser &&
        page !== "/login" &&
        page !== "/signup" &&
        page !== "/verify_email" &&
        page !== "/forget_password"
      )
        router.push("/login");
      // console.log("uncomment code in auth folder");
    }
  };

  useEffect(() => {
    // if (!user) return;
    if (!user?.dbUser?.isCreated) router.push("/user/profile/");
    else if (user?.dbUser?.isCreated) router.push("/");
    setLoading(false);
    // console.log(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.dbUser?.isCreated, loading]);

  useEffect(() => {
    if (user) {
      setActive(true);
    } else {
      isCurrentUser();
    }
    // else {
    //   if (!user && process.browser && page !== "/login" && page !== "/signup")
    //     router.push("/login");
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (
      page === "/login" ||
      page === "/signup" ||
      page === "/verify_email" ||
      page === "/forget_password"
    ) {
      setActive(true);
    }
  }, [page]);

  // IF NO USER REDIRECT TO LOGIN PAGE
  // to be uncommented when want to ensure user should not leave login page if not authorised
  // if (!active) return <Loader active={true} />;

  if (loading || userLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);

const mapStateToProps = (state) => ({
  activeUser: state.user.user,
});
export default connect(mapStateToProps, { setActiveUser })(AuthProvider);
