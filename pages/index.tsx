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
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);

      // dispatch(setUser());
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    isCurrentUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>hello</div>;
}
