/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./DropDown.module.scss";

interface dropDown {
  ElemList?: object[];
  name?: string;
  style?: object;
  mode?: string;
  selectedValue?:string;
  setSelectedValue?: any;
}
const RecipeDropDown = ({
  style = {},
  ElemList,
  name = "dropdown",
  selectedValue,
  setSelectedValue,
}: dropDown): JSX.Element => {
  return (
    <div className={styles.formGroup}>
      <select
        name={name}
        id="dropdown"
        className={styles.customSelectbx}
        style={{ backgroundImage: `url(/icons/dropdown.svg)`, ...style }}
        onChange={(e) => {
          setSelectedValue(e.target.value);
        }}
        value={selectedValue}
      >
        {ElemList?.map((item, index) => {
          return (
            // @ts-ignore
            <option value={item?.name} key={index}>
              {/* @ts-ignore */}
              {item?.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default RecipeDropDown;
