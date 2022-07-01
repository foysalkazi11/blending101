import React from "react";
import CapsuleButton from "../../../customButtons/capsuleButton/capsuleButton.component";
import { BsCartCheck } from "react-icons/bs";
import styles from "./combinedButtonTray.module.scss";

interface CombinedButtonTrayInterface {
  leftCapsuleText: string;
  rightCapsuleText: string;
  leftCapsuleFunc?: () => {};
  rightCapsuleFunc?: () => {};
}
const CombinedButtonTray = () => {
  return (
    <div className={styles.mainContainer}>
      <BsCartCheck className={styles.mainContainer__icon} />
      <div className={styles.mainContainer__buttonDiv}>
        <CapsuleButton
          leftCapsuleText="Buy"
          rightCapsuleText="Pantry"
          leftCapsuleFunc={() => {
          }}
          rightCapsuleFunc={() => {
          }}
        />
      </div>
    </div>
  );
};

export default CombinedButtonTray;
