import React, { useEffect, useState, useContext, createContext } from "react";
import Router, { useRouter } from "next/router";
import { Auth, Amplify } from "aws-amplify";
import { toast } from "react-toastify";

import AmplifyConfig from "../configs/aws";

Amplify.configure(AmplifyConfig);

const DEFAULT_ADMIN = { name: "", email: "", image: "" };

const getValue = (user: any, key: string) => user?.attributes[key] === "true";

interface IAuthContext {
  user: any;
  admin: { name: string; email: string; image: string };
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

// INITIALIZE 1: CREATE AUTH CONTEXT
const AuthContext = createContext<IAuthContext>({
  user: {},
  admin: DEFAULT_ADMIN,
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
  const asPath = router.asPath;

  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState(DEFAULT_ADMIN);

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
      setUser({});
      localStorage.removeItem("aws_token");
      router.push("/auth/login");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
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

export const useAdmin = () => {
  const { admin } = useContext(AuthContext);
  return admin;
};
