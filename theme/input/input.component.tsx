import React, { forwardRef, ReactNode } from "react";
import styles from "./input.module.scss";
import { useFormContext } from "react-hook-form";
import { InputValidationObjType } from "type/inputValidationObjType";

type InputComponentProps = React.ComponentPropsWithRef<"input"> & {
  type?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  min?: number;
  max?: number;
  inputWithIcon?: boolean;
  icon?: ReactNode | string;
  label?: string;
  validationObj?: InputValidationObjType;
  border?: "borderPrimary" | "borderSecondary";
};

function InputComponent(
  {
    type = "text",
    style = {},
    placeholder = "Add your text here",
    handleChange = () => {},
    name = "",
    min = 0,
    max,
    inputWithIcon = false,
    icon,
    label = "",
    validationObj = {},
    border = "borderPrimary",
    ...InputProps
  }: InputComponentProps,
  ref,
) {
  const formContext = useFormContext();
  let register: any = () => {};
  if (formContext && name) {
    register = formContext.register;
  }

  if (icon) {
    return (
      <>
        {label && <label className={styles.label}>{label}</label>}
        <div className={`${styles.inputWithIcon} ${styles[border]}`}>
          <input
            name={name}
            className={`${styles.input} `}
            type={type}
            style={style}
            onChange={(e) => handleChange}
            placeholder={placeholder}
            min={min}
            max={max}
            ref={ref}
            {...InputProps}
            {...register(name, validationObj)}
          />
          {typeof icon === "string" ? (
            <img className={styles.icon} src={icon} alt="icon" />
          ) : (
            <div className={styles.icon}>{icon}</div>
          )}
          {formContext?.formState?.errors?.[name] && (
            <span className={styles.errorMessage}>
              {formContext?.formState?.errors?.[name]?.message || "Required*"}
            </span>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {label && <label className={styles.label}>{label}</label>}
      <div style={{ position: "relative" }}>
        <input
          name={name}
          className={`${styles.input} ${styles[border]}`}
          type={type}
          style={style}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          ref={ref}
          {...InputProps}
          {...register(name, validationObj)}
        />
        {formContext?.formState?.errors?.[name] && (
          <span className={styles.errorMessage}>{formContext?.formState?.errors?.[name]?.message || "Required*"}</span>
        )}
      </div>
    </>
  );
}

export default forwardRef(InputComponent);
