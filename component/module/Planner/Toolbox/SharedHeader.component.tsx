import React, { ReactNode } from "react";
import styles from "./SharedHeader.module.scss";

interface SharedHeaderInterface {
  title?: string;
  optionTray?: ReactNode;
}

const SharedHeader = ({ title, optionTray }: SharedHeaderInterface) => {
  title = title || "";
  optionTray = optionTray || <></>;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__title}>{title}</div>
      <div className={styles.mainContainer__optionTray}>{optionTray}</div>
    </div>
  );
};

export default SharedHeader;
