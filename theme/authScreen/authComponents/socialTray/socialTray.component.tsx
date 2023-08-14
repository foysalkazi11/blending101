import React from "react";
import styles from "./socialTray.module.scss";
import { useUserHandler } from "../../../../context/AuthProvider";

const SocialTray = () => {
  const { oAuthSignIn } = useUserHandler();
  return (
    <ul className={styles.socialWrap}>
      <li className={styles.listElem}>
        <img
          src={"/images/google.png"}
          alt="Icon"
          onClick={() => oAuthSignIn("Google")}
        />
      </li>
      <li className={styles.listElem}>
        <img
          src={"/images/fb.png"}
          alt="Icon"
          onClick={() => oAuthSignIn("Facebook")}
        />
      </li>
      <li className={styles.listElem}>
        <img src={"/images/twitter.png"} alt="Icon" />
      </li>
      <li className={styles.listElem}>
        <img
          src={"/images/apple.png"}
          alt="Icon"
          onClick={() => oAuthSignIn("Apple")}
        />
      </li>
    </ul>
  );
};

export default SocialTray;
