import React from "react";
import styles from "./DropDown.module.scss";

interface dropDown {
  listElem: string[];
  value?: string;
  handleChange?: (name: any, value: any) => void;
  name?: string;
  style?: object;
  valueState?:any;
}
const DropDown = ({
  listElem,
  style = {},
  value = "",
  handleChange = () => {},
  name = "dropdown",
  valueState
}: dropDown) => {
  return (
    <div className={styles.formGroup}>
      <select
        name={name}
        id="dropdown"
        className={styles.customSelectbx}
        style={{ backgroundImage: `url(/icons/dropdown.svg)`, ...style }}
        onChange={(e)=>{valueState(e.target.value)}}
      >
        {listElem?.map((item, index) => {
          return (
            <option value={item.toLowerCase()} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
