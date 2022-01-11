import React, { useEffect, useState, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setActiveUser } from "../redux/users/user.action";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Loader from "../theme/loader/Loader";
import { Auth } from "aws-amplify";
import { setDbUser, setProvider, setUser } from "../redux/slices/userSlice";
import { useMutation } from "@apollo/client";
import CREATE_NEW_USER from "../gqlLib/user/mutations/createNewUser";

// INITIALIZE 1: CREATE AUTH CONTEXT
const AuthContext = createContext();

// CONTEXT WRAPPER: PROVIDES AUTH
function AuthProvider({ children, activeUser }) {
  // INITIALIZE 2: DEFINE STATES

  const [active, setActive] = useState(null);
  const { user } = useAppSelector((state) => state?.user);
  const [createNewUser] = useMutation(CREATE_NEW_USER);
  const dispatch = useAppDispatch();

  const router = useRouter();

  // SETS USER WHEN ACTIVE USER IS DETECTED

  // EXTRACT PAGE
  const page = router.pathname;

  const isCurrentUser = async () => {
    try {
      let userEmail = "";
      let provider = "";
      const user = await Auth.currentAuthenticatedUser();
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
    }
    catch (error) {
      console.log(error?.message);
      if (
        !user &&
        process.browser &&
        page !== "/login" &&
        page !== "/signup" &&
        page !== "/varify_email"
      )
        // to be uncommented for auth to work correctly and remove clg at line 75
        // router.push("/login");
        console.log("uncomment code in auth folder")
    }
  };

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
    if (page === "/login" || page === "/signup" || page === "/varify_email") {
      setActive(true);
    }
  }, [page]);

  // IF NO USER REDIRECT TO LOGIN PAGE
  // to be uncommented when want to ensure user should not leave login page if not authorised
  // if (!active) return <Loader active={true} />;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);

const mapStateToProps = (state) => ({
  activeUser: state.user.user,
});
export default connect(mapStateToProps, { setActiveUser })(AuthProvider);
