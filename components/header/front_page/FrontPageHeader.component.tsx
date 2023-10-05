import React from "react";
import styles from "./FrontPageHeader.module.scss";
import Image from "next/image";
import ButtonComponent from "../../../theme/button/buttonA/button.component";
import Link from "next/link";

const FrontPageHeader = () => {
  return (
    <div className={styles.headerMain}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="logo"
            height={52}
            width={180}
            objectFit={"contain"}
            layout={"responsive"}
          />
        </div>
        <div className={styles.rightOptionTray}>
          <ul>
            <li>
              <div className={styles.features}>
                <Link href="#">Features</Link>
                <div className={styles.dropDown}>
                  <Image
                    src="/icons/dropdown.png"
                    alt="logo"
                    objectFit={"contain"}
                    layout={"fill"}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className={styles.login}>
                <Link href="/login">
                  <ButtonComponent
                    type={"primary"}
                    style={{ height: "100%" }}
                    fullWidth
                    value={"Login"}
                  />
                </Link>
              </div>
            </li>
            <li>
              <div className={styles.signUp}>
                <Link href="/signup">
                  <ButtonComponent
                    type={"transparent"}
                    style={{ border: "none" }}
                    fullWidth
                    value={"Sign up"}
                  />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FrontPageHeader;
