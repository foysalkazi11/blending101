import React from "react";
import styles from "./inputGoal.module.scss";

const InputGoal = ({ inputValue, setInputValue, name }) => {
  return (
    <input
      name={name}
      type="number"
      className={styles.mainInput}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e);
      }}
    />
  );
};

export default InputGoal;
