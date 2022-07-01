import React from "react";
import styles from "./optionIconCard.module.scss";

interface OptionCardInterface {
  text?: string;
  icon?: React.ReactNode;
}
const OptionIconCard = ({ text, icon }: OptionCardInterface) => {
  return (
    <div className={styles.mainContainer}>
      <span className={styles.text}>{text}</span>
      <span className={styles.icon}>{icon}</span>
    </div>
  );
};

export default OptionIconCard;
