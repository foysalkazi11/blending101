import React from "react";
import styles from "./Responsive.module.scss";

const HideOnDesktop: React.FC = ({ children }) => {
  return <div className={styles.mwrapper}>{children}</div>;
};

const HideOnMobile: React.FC = ({ children }) => {
  return <div className={styles.dwrapper}>{children}</div>;
};

export { HideOnDesktop, HideOnMobile };
