import React from "react";
import styles from "./Buttons.module.scss";

type SubmitBtnProps = {
  style?: {};
  handleClick?: () => void;
  text?: string;
};

const SubmitBtn = ({
  style = {},
  handleClick = () => {},
  text = "Submit",
}: SubmitBtnProps) => {
  return (
    <button className={styles.submitBtn} style={style} onClick={handleClick}>
      {text}
    </button>
  );
};

export default SubmitBtn;
