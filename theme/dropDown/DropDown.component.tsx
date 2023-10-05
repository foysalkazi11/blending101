/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./DropDown.module.scss";
import { useFormContext } from "react-hook-form";
import { InputValidationObjType } from "type/inputValidationObjType";

export type DropDownType = React.ComponentPropsWithoutRef<"select"> & {
  listElem?: { name: string; value: string | number }[];
  style?: React.CSSProperties;
  name?: string;
  validationObj?: InputValidationObjType;
  border?: "borderPrimary" | "borderSecondary" | "default";
  label?: string;
};
const DropDown = ({
  listElem = [],
  style = {},
  name = "",
  validationObj,
  border = "borderPrimary",
  placeholder = "Select",
  label = "",
  ...rest
}: DropDownType) => {
  const formContext = useFormContext();
  let register: any = () => {};
  if (formContext && name) {
    register = formContext.register;
  }

  return (
    <>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.formGroup}>
        <select
          name={name}
          id="dropdown"
          className={`${styles.customSelectbx} ${styles[border]}`}
          style={{ ...style, backgroundImage: `url(/icons/dropdown.svg)` }}
          {...register(name, validationObj)}
          {...rest}
        >
          <option value={""}>{placeholder}</option>
          {listElem?.map((item, index) => {
            return (
              <option value={item?.value} key={index}>
                {item?.name}
              </option>
            );
          })}
        </select>
        {formContext?.formState?.errors?.[name] && (
          <span className={styles.errorMessage}>{formContext?.formState?.errors?.[name]?.message || "Required*"}</span>
        )}
      </div>
    </>
  );
};

export default DropDown;
