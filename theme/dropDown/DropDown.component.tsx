/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./DropDown.module.scss";

interface dropDown {
  listElem?: { name: string; value: string }[];
  value?: string;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
  name?: string;
}
const DropDown = ({
  listElem = [],
  style = {},
  value = "",
  name = "",
  handleChange = () => {},
}: dropDown) => {
  return (
    <div className={styles.formGroup}>
      <select
        name={name}
        id="dropdown"
        className={styles.customSelectbx}
        style={{ backgroundImage: `url(/icons/dropdown.svg)`, ...style }}
        onChange={(e) => handleChange(e)}
        value={value}
      >
        {listElem?.map((item, index) => {
          return (
            <option value={item?.value} key={index}>
              {item?.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
