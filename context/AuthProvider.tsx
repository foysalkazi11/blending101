import React, { useEffect, useState, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { Auth, Amplify } from "aws-amplify";
import { toast } from "react-toastify";

import AmplifyConfig from "../configs/aws";
import { GET_USER } from "../gqlLib/user/mutations/createNewUser";
import { useMutation } from "@apollo/client";

Amplify.configure({ ...AmplifyConfig, ssr: true });

const DEFAULT_USER = { id: "", name: "", email: "", image: "" };

interface IAuthContext {
  user: typeof DEFAULT_USER;
  session: any;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

// INITIALIZE 1: CREATE AUTH CONTEXT
const AuthContext = createContext<IAuthContext>({
  user: DEFAULT_USER,
  session: null,
  signIn: (email: string, password: string) => {},
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

  const [user, setUser] = useState(DEFAULT_USER);
  const [session, setSession] = useState<any>(null);
  const [getUser] = useMutation(GET_USER);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setSession(user);
      let email, provider;
      if (user?.attributes?.email) {
        email = user?.attributes?.email;
        provider = "email";
      } else {
        email = user?.signInUserSession?.idToken?.payload?.email;
        provider = user?.signInUserSession?.idToken?.payload?.identities;
      }
      getUser({
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
      });
    });
  }, [getUser]);

  const signIn = async (email: string, password: string) => {
    const loading = toast.loading("Logging In", {
      position: toast.POSITION.TOP_RIGHT,
    });

    try {
      const user = await Auth.signIn(email, password);
      toast.update(loading, {
        render: "Signed in Succesfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setUser(user);
      localStorage.setItem(
        "aws_token",
        user?.signInUserSession?.idToken?.jwtToken,
      );
      router.push("/");
    } catch (error) {
      toast.update(loading, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(DEFAULT_USER);
      router.push("/login");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        signOut,
      }}
    >
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
