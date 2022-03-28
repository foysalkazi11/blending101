import React from "react";
import styles from "./RadioButton.module.scss";

interface RadioButtonProps {
  name: string;
  id: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  handleChange,
  id,
  label,
  name,
  value,
}: RadioButtonProps) => {
  return (
    <label className={styles.radioContainer}>
      {label}
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={value === id}
        onChange={handleChange}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default RadioButton;
