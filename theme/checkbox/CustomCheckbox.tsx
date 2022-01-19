import React from "react";
import styles from "./CustomCheckbox.module.scss";

type CustomCheckboxProps = {
  value?: string | number;
  name?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disable?: boolean;
};

const CustomCheckbox = ({
  handleChange = () => {},
  checked = false,
  name = "",
  value = "",
  disable = false,
}: CustomCheckboxProps) => {
  return (
    <label className={styles.checkbxWrap}>
      <input
        type="checkbox"
        value={value}
        name={name}
        onChange={(e) => handleChange(e)}
        checked={checked}
        disabled={disable}
      />{" "}
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CustomCheckbox;
