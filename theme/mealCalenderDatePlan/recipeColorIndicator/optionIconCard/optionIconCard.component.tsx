import React from "react";
import styles from "./optionIconCard.module.scss";

interface OptionCardInterface {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
const OptionIconCard = ({ text, icon, onClick }: OptionCardInterface) => {
  return (
    <div className={styles.mainContainer} onClick={onClick}>
      <span>{text}</span>
      <span className={styles.icon}>{icon}</span>
    </div>
  );
};

export default OptionIconCard;
