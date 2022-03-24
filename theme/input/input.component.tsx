import React, { useState } from "react";
import styles from "./input.module.scss";

interface InputComponentProps {
  type?: string;
  style?: React.CSSProperties;
  value?: string;
  setValue?: Function;
  placeholder?: string;
  textarea?: any;
  fullWidth?: boolean;
  maxWidth?: string;
  fieldName?: string;
  handleChange?: Function;
  name?: string;
}

export default function InputComponent({
  type,
  style,
  value,
  setValue,
  placeholder,
  textarea,
  fullWidth,
  maxWidth,
  fieldName,
  handleChange,
  name,
}: InputComponentProps) {
  const [text, setText] = useState("");
  // STEP 1: INITIALIZE PROPS TO AVOID UI FALL
  type = type || "text";
  style = style || {};
  if (fullWidth) style = { ...style, width: "100%" };
  if (maxWidth) style = { ...style, maxWidth: maxWidth };
  value = value || text;
  placeholder = placeholder || "Add your text here";

  // STEP 2: CHANGE VALUES AND RETURN IT
  const onChange = (e) => {
    handleChange && handleChange(e);
    const val = e.target.value;
    if (setValue) {
      setValue(val);
    } else {
      setText(val);
    }
  };

  // CASE 1: IF TEXTAREA RETURN TEXTAREA COMPONENT
  if (textarea) return <textarea className={styles.textarea} />;

  // CASE: DEFAULT RETURN INPUT COMPONENT
  return (
    <input
      name={name}
      className={styles.input}
      type={type}
      style={style}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
