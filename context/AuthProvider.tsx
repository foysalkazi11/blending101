import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  createContext,
} from "react";
import { useRouter } from "next/router";
import { Auth, Amplify } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

import AmplifyConfig from "../configs/aws";
import { GET_USER } from "../gqlLib/user/mutations/createNewUser";
import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import { setDbUser } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/hooks";

type TProvider = "Amazon" | "Google" | "Facebook" | "Apple" | "Cognito";
Amplify.configure({ ...AmplifyConfig, ssr: true });

const DEFAULT_USER = { id: "", name: "", email: "", image: "" };

interface IAuthContext {
  user: typeof DEFAULT_USER;
  session: any;
  signIn: (
    email: string,
    password: string,
    onSuccess?: (user: any) => void,
    onError?: (error: any) => void,
  ) => void;
  oAuthSignIn: (provider: TProvider) => void;
  signOut: () => void;
}

// INITIALIZE 1: CREATE AUTH CONTEXT
const AuthContext = createContext<IAuthContext>({
  user: DEFAULT_USER,
  session: null,
  signIn: (email: string, password: string) => {},
  oAuthSignIn: (provider: TProvider) => {},
  signOut: () => {},
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
        provider =
          user?.signInUserSession?.idToken?.payload?.identities?.[0]?.providerName?.toLowerCase();
      }
      if (email && provider)
        return getUser({
          variables: {
            data: { email: email || user?.signInUserSession, provider },
          },
        }).then((response) => {
          const profile = response?.data?.createNewUser;
          setUser({
            id: profile?._id,
            name: profile?.displayName,
            email: profile?.email,
            image: profile?.image,
          });
          dispatch(
            setDbUser({
              _id: profile?._id,
              displayName: profile?.displayName,
              email: profile?.email,
              image: profile?.image,
              compareLength: profile?.compareLength,
              bio: "",
              yourBlender: "",
              provider: "",
              firstName: "",
              orderHistoty: [],
              lastName: "",
              location: "",
              myCart: [],
              recentViewedProducts: [],
              createdAt: "",
              configuration: undefined,
              wikiCompareCount: 0,
            }),
          );
          return profile;
        });
    },
    [dispatch, getUser],
  );

  useEffect(() => {
    // Google Authentication
    if (router.asPath.startsWith("/login/#access_token=")) router.push("/");
    // Redirects when it is directed to authentication related page
    if (
      [
        "/login",
        "/signup",
        "/verify_email",
        "/forget_password",
        "/welcome_blending101_extension",
      ].includes(router.pathname)
    )
      return;
    Auth.currentAuthenticatedUser().then(sessionHandler);
  }, [router, sessionHandler]);

  const signIn = async (
    email: string,
    password: string,
    onSuccess = (user) => {},
    onError = (error) => {},
  ) => {
    try {
      const user = await Auth.signIn(email, password);
      const bdUser = await sessionHandler(user);
      // router.push("/");
      onSuccess(bdUser);
    } catch (error) {
      notification("error", error.message);
      onError(error);
    }
  };

  const oAuthSignIn = async (
    provider: TProvider,
    onSuccess = (user) => {},
    onError = (error) => {},
  ) => {
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
  // if (user.id === "") return <></>;
  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        oAuthSignIn,
        signOut,
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
