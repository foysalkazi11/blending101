import React from "react";
import styles from "./RadioButton.module.scss";

interface RadioButtonProps {
  name: string;
  htmlFor: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  handleChange,
  htmlFor,
  label,
  name,
  value,
}: RadioButtonProps) => {
  return (
    <div className={styles.radioButton_wraper}>
      <label className={styles.custom_radio} htmlFor={htmlFor}>
        <input
          type="radio"
          id={htmlFor}
          name={name}
          value={value}
          onChange={handleChange}
          checked={value === htmlFor}
        />
        <div className={styles.custom_radio_content}>
          <h5>{label}</h5>
        </div>
      </label>
    </div>
  );
};

export default RadioButton;
