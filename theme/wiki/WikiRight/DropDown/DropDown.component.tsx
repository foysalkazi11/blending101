import React from "react";
import styles from "./DropDown.module.scss";

interface dropDown {
  listElem: string[];
}
const DropDown = ({ listElem }: dropDown) => {
  return (
    <div className={styles.formGroup}>
      <select
        name="dropdown"
        id="dropdown"
        className={styles.customSelectbx}
        style={{ backgroundImage: `url(/icons/dropdown.svg)` }}
      >
        {listElem.map((item, index) => {
          return (
            <option value={item.toLowerCase()} key={index}>
              <span>{item}</span>
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
