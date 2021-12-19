import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Theme.module.scss";
import { Auth } from "aws-amplify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";

export default function Home() {
  const [state, setState] = useState("desktop");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);

  const isCurrentUser = async () => {
    try {
      const {
        attributes: { email },
      } = await Auth.currentAuthenticatedUser();

      dispatch(setUser(email));
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

  return <div>hello</div>;
}
