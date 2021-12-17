/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./header.module.scss";
import SocialComponent from "./social/Social.component";
import LocalMallIcon from "@mui/icons-material/LocalMall";

interface headerInterface {
  logo: Boolean;
  headerTitle: string;
  fullWidth?: Boolean
}

export default function HeaderComponent({
  logo = true,
  headerTitle = "Home",
  fullWidth
}: headerInterface) {

  const style = fullWidth ? {width: '100%'} : {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} style={style}>
        <div className={styles.header__inner}>
          <div className={styles.left + " " + styles.logo}>
            {logo && <img src="/logo.png" alt="logo" />}
          </div>
          <div className={styles.center + " " + styles.info}>
            <h3>{headerTitle}</h3>
          </div>
          <div className={styles.right + " " + styles.logo}>
            <div>
              <SocialComponent />
            </div>
            <div>
              <LocalMallIcon className={styles.cart__icon} />
            </div>
            <div className={styles.profile}>
              <img src="/user-profile.png" alt="prfile.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
