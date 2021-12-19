/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./socialTray.module.scss";
import Image from "next/image";
import Link from "next/link";

import { Auth, Hub } from "aws-amplify";
import { imageListClasses } from "@mui/material";

const SocialTray = () => {
  const [user, setUser] = useState("");

  const handleSocialSignup = async (provider) => {
    try {
      await Auth.federatedSignIn({ provider });
      getUser();
    } catch (error) {
      console.log(error?.message);
    }
  };

  const getUser = async () => {
    try {
      const user = await Auth?.currentAuthenticatedUser();
      console.log(user);
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <>
      <ul className={styles.socialWrap}>
        <li className={styles.listElem}>
          <img
            src={"/images/google.png"}
            alt="Icons will soon Load"
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
