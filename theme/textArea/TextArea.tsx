import React, { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";
import { useFormContext } from "react-hook-form";

type InputComponentProps = React.ComponentPropsWithRef<"textarea"> & {
  style?: React.CSSProperties;
  placeholder?: string;
  name?: string;
  borderSecondary?: boolean;
  rows?: number;
  validationObj?: { [key: string]: any };
  label?: string;
  border?: "borderPrimary" | "borderSecondary";
};

function TextArea(
  {
    style = {},
    placeholder = "Add your text here",
    name = "",
    borderSecondary = false,
    rows = 4,
    validationObj = {},
    label = "",
    border = "borderPrimary",

    ...InputProps
  }: InputComponentProps,
  ref = null,
) {
  const formContext = useFormContext();
  let register: any = () => {};
  if (formContext && name) {
    register = formContext.register;
  }
  return (
    <>
      {label && <label className={styles.label}>{label}</label>}
      <div style={{ position: "relative" }}>
        <textarea
          name={name}
          className={`${styles.textArea} ${styles[border]}`}
          style={style}
          placeholder={placeholder}
          rows={rows}
          ref={ref}
          {...register(name, validationObj)}
          {...InputProps}
        />
        {formContext?.formState?.errors?.[name] && (
          <span className={styles.errorMessage}>{formContext?.formState?.errors?.[name]?.message || "Required*"}</span>
        )}
      </div>
    </>
  );
}

export default React.forwardRef(TextArea);
