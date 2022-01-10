import React from "react";
import styles from "./Buttons.module.scss";

type SubmitBtnProps = {
  style?: {};
  handleClick?: () => void;
  text?: string;
};

const CancleBtn = ({
  style = {},
  handleClick = () => {},
  text = "Cancle",
}: SubmitBtnProps) => {
  return (
    <button className={styles.cancleBtn} style={style} onClick={handleClick}>
      {text}
    </button>
  );
};

export default CancleBtn;
