import React, { InputHTMLAttributes } from "react";
import styles from "./input.module.scss";

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  style?: React.CSSProperties;
  value?: string | number;
  placeholder?: string;
  textarea?: boolean;
  fullWidth?: boolean;
  maxWidth?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  min?: number;
  max?: number;
  borderSecondary?: boolean;
  fieldName?: string;
}

export default function InputComponent({
  type,
  style = {},
  value,
  placeholder,
  textarea,
  fullWidth,
  maxWidth,
  handleChange = () => {},
  name,
  min = 0,
  max,
  borderSecondary = false,
  fieldName = "",
  ...InputProps
}: InputComponentProps) {
  // STEP 1: INITIALIZE PROPS TO AVOID UI FALL
  type = type || "text";
  style = style || {};
  if (fullWidth) style = { ...style, width: "100%" };
  if (maxWidth) style = { ...style, maxWidth: maxWidth };
  value = value || "";
  placeholder = placeholder || "Add your text here";

  // CASE 1: IF TEXTAREA RETURN TEXTAREA COMPONENT
  if (textarea) return <textarea className={styles.textarea} />;

  // CASE: DEFAULT RETURN INPUT COMPONENT

  return (
    <input
      name={name}
      className={`${styles.input} ${
        borderSecondary ? styles.borderSecondary : null
      }`}
      type={type}
      style={style}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
      {...InputProps}
    />
  );
}
