import React, { useEffect, useState, useCallback, useContext, createContext, Dispatch, Fragment } from "react";
import { useRouter } from "next/router";
import { Auth, Amplify } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import AmplifyConfig from "../configs/aws";
import { GET_USER } from "../gqlLib/user/mutations/createNewUser";
import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import { updateUserCompareLength } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/hooks";
import Loader from "component/atoms/Loader/loader.component";
import routes from "routes";

type TProvider = "Amazon" | "Google" | "Facebook" | "Apple" | "Cognito";
Amplify.configure({ ...AmplifyConfig, ssr: true });

type DEFAULT_USER_TYPE = {
  id: string;
  name: string;
  email: string;
  image: string;
};
const DEFAULT_USER = { id: "", name: "", email: "", image: "" };
const DEFAULT_LOGIN_STATE = { isChecking: true, isLogin: false };

interface IAuthContext {
  user: typeof DEFAULT_USER;
  session: any;
  signIn: (email: string, password: string, onSuccess?: (user: any) => void, onError?: (error: any) => void) => void;
  oAuthSignIn: (provider: TProvider) => void;
  signOut: () => void;
  setUser: Dispatch<React.SetStateAction<DEFAULT_USER_TYPE>>;
}

// INITIALIZE 1: CREATE AUTH CONTEXT
const AuthContext = createContext<IAuthContext>({
  user: DEFAULT_USER,
  session: null,
  signIn: (email: string, password: string) => {},
  oAuthSignIn: (provider: TProvider) => {},
  signOut: () => {},
  setUser: () => {},
});

// CONTEXT WRAPPER: PROVIDES AUTH
interface AuthProviderProps {
  activeUser?: {
    name: string;
    expiresIn?: number;
  };
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [state, setState] = useState(DEFAULT_LOGIN_STATE);
  const [user, setUser] = useState(DEFAULT_USER);
  const [session, setSession] = useState<any>(null);
  const [getUser] = useMutation(GET_USER);

  const sessionHandler = useCallback(
    async (user) => {
      setSession(user);
      let email, provider;
      if (user?.attributes?.email) {
        email = user?.attributes?.email;
        provider = "email";
      } else {
        email = user?.signInUserSession?.idToken?.payload?.email;
        provider = user?.signInUserSession?.idToken?.payload?.identities?.[0]?.providerName?.toLowerCase();
      }
      if (email && provider) {
        try {
          const { data } = await getUser({
            variables: {
              data: { email: email || user?.signInUserSession, provider },
            },
          });
          const profile = data?.createNewUser;
          setUser({
            id: profile?._id,
            name: profile?.displayName,
            email: profile?.email,
            image: profile?.image,
          });
          setState({
            isChecking: false,
            isLogin: true,
          });
          dispatch(updateUserCompareLength(profile?.compareLength));
          return profile;
        } catch (error) {
          throw new Error("Failed to login");
        }
      } else {
        throw new Error("Email or provider not found");
      }
    },
    [dispatch, getUser],
  );

  const isPublicRoute = [
    "/login",
    "/signup",
    "/verify_email",
    "/forget_password",
    "/welcome_blending101_extension",
  ].includes(router.pathname);

  useEffect(() => {
    // Redirects when it is directed to authentication related page
    if (isPublicRoute) {
      return setState({
        isChecking: false,
        isLogin: true,
      });
    }
    Auth.currentAuthenticatedUser()
      .then(sessionHandler)
      .catch((error) => {
        setState({
          isChecking: false,
          isLogin: false,
        });
        router.push(routes.login);
      });
  }, [isPublicRoute, router, sessionHandler]);

  const signIn = async (email: string, password: string, onSuccess = (user) => {}, onError = (error) => {}) => {
    try {
      const user = await Auth.signIn(email, password);
      const bdUser = await sessionHandler(user);
      onSuccess(bdUser);
      router.push("/");
    } catch (error) {
      notification("error", error.message);
      onError(error);
    }
  };

  const oAuthSignIn = async (provider: TProvider, onSuccess = (user) => {}, onError = (error) => {}) => {
    console.log("Inovikg");
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider[provider],
    })
      .then(sessionHandler)
      .then((user) => {
        console.log(user);
        // router.push("/");
        onSuccess(user);
      })
      .catch((error) => {
        notification("error", error?.message);
        onError(error);
      });
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(DEFAULT_USER);
      router.push("/login");
    } catch (error) {
      notification("error", error?.message);
    }
  };
  // console.log(user);
  if (!isPublicRoute && state.isChecking) return <Loader />;
  if (!state.isChecking && !state.isLogin) return <Fragment />;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        oAuthSignIn,
        signOut,
        setUser,
      }}
    >
      {/* {user.id ? children : null} */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useUser = () => {
  const { user } = useContext(AuthContext);
  return user;
};

export const useUserHandler = () => {
  const { user, session, ...methods } = useContext(AuthContext);
  return methods;
};

export const useSession = () => {
  const { session } = useContext(AuthContext);
  return session;
};
