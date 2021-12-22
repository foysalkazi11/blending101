/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./socialTray.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { useMutation } from "@apollo/client";
import CREATE_NEW_USER from "../../../../gqlLib/user/mutations/createNewUser";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setDbUser,
  setProvider,
  setUser,
} from "../../../../redux/slices/userSlice";
import { useRouter } from "next/router";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";

const SocialTray = () => {
  const [createNewUser] = useMutation(CREATE_NEW_USER);
  const dispatch = useAppDispatch();
  const history = useRouter();

  const updateUser = async (email, provider) => {
    try {
      const { data } = await createNewUser({
        variables: {
          data: { email, provider },
        },
      });
      // reactToastifyNotification("info", "Sign up successfully");
      dispatch(setUser(email));
      dispatch(setDbUser(data?.createNewUser));
      dispatch(setProvider(provider));
      history.push("/");
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: true,
    })
      .then((res) => {
        const {
          signInUserSession: {
            idToken: {
              payload: { email, given_name, identities },
            },
          },
        } = res;
        // console.log(email, given_name, identities?.[0].providerName);

        updateUser(email, identities?.[0]?.providerName);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSocialSignup = async (provider) => {
    try {
      await Auth.federatedSignIn({ provider: provider });
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <>
      {/* <button onClick={hub}>get user</button> */}
      <ul className={styles.socialWrap}>
        <li className={styles.listElem}>
          <img
            src={"/images/google.png"}
            alt="Icons will soon Load"
            //@ts-ignore
            onClick={() => handleSocialSignup("Google")}
          />
        </li>
        <li className={styles.listElem}>
          <img
            src={"/images/fb.png"}
            alt="Icons will soon Load"
            onClick={() => handleSocialSignup("Facebook")}
          />
        </li>
        <li className={styles.listElem}>
          <img src={"/images/twitter.png"} alt="Icons will soon Load" />
        </li>
        <li className={styles.listElem}>
          <img src={"/images/apple.png"} alt="Icons will soon Load" />
        </li>
      </ul>
    </>
  );
};

export default SocialTray;
