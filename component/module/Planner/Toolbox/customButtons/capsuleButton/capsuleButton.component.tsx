import React from "react";
import styles from "./capsule.module.scss";

interface CapsuleButtonInterface {
  leftCapsuleText?: string;
  rightCapsuleText?: string;
  leftCapsuleFunc?: () => void;
  rightCapsuleFunc?: () => void;
}
const CapsuleButton = ({
  leftCapsuleText,
  rightCapsuleText,
  leftCapsuleFunc,
  rightCapsuleFunc,
}: CapsuleButtonInterface) => {
  if (!leftCapsuleText && !rightCapsuleText) return null;

  const activeStyle = { color: "#fd5109" };
  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.mainContainer__left}
        style={activeStyle}
        onClick={leftCapsuleFunc}
      >
        {leftCapsuleText}
      </div>
      <div
        className={styles.mainContainer__right}
        onClick={rightCapsuleFunc}
      >
        {rightCapsuleText}
      </div>
    </div>
  );
};

export default CapsuleButton;
