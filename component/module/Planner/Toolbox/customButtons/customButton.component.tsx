import React, { ReactNode } from "react";
import styles from "./customButton.module.scss";

interface CustomButtonInterface {
  iconComponent?: ReactNode;
  text: string;
  onClickFunc?: () => void;
}
const CustomButton = ({
  iconComponent,
  text,
  onClickFunc,
}: CustomButtonInterface) => {
  return (
    <div className={styles.mainContainer} onClick={onClickFunc}>
      {iconComponent}
      <div className={styles.mainContainer__text}>{text}</div>
    </div>
  );
};

export default CustomButton;
