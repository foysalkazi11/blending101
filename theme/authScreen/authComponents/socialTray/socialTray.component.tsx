/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./socialTray.module.scss";
import Image from "next/image";
import Link from "next/link";

import { Auth, Hub } from "aws-amplify";
import { imageListClasses } from "@mui/material";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

const SocialTray = () => {
  const [user, setUser] = useState("");

  const handleSocialSignup = async (provider) => {
    try {
      await Auth.federatedSignIn({ provider: provider });
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
    } catch (error) {
      console.log(error?.message);
    }
  };

  // const hub = () => {
  //   Hub.listen("auth", ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case "signIn":
  //       case "cognitoHostedUI":
  //         getUser().then((userData) => console.log(userData));
  //         break;
  //       case "signOut":
  //         setUser(null);
  //         break;
  //       case "signIn_failure":
  //       case "cognitoHostedUI_failure":
  //         console.log("Sign in failure", data);
  //         break;
  //     }
  //   });
  // };
  // function getUser() {
  //   return Auth.currentAuthenticatedUser()
  //     .then((userData) => userData)
  //     .catch(() => console.log("Not signed in"));
  // }

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
