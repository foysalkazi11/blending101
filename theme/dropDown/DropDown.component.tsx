/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import styles from "./DropDown.module.scss";

interface dropDown {
  listElem?: string[];
  ElemList?: object[];
  value?: string;
  handleChange?: (name: any, value: any) => void;
  name?: string;
  style?: object;
  valueState?: any;
  selectedBlendValueState?: any;
  mode?: string;
}
const DropDown = ({
  listElem,
  style = {},
  value = "",
  ElemList,
  handleChange = () => {},
  name = "dropdown",
  valueState = () => {},
  selectedBlendValueState,
}: dropDown) => {
  return (
    <div className={styles.formGroup}>
      <select
        name={name}
        id="dropdown"
        className={styles.customSelectbx}
        style={{ backgroundImage: `url(/icons/dropdown.svg)`, ...style }}
        onChange={(e) => {
          valueState(e.target.value);
        }}
        value={selectedBlendValueState?.toLowerCase()}
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
