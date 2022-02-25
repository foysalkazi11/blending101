import React, { useState } from "react";
import styles from "../inputField.module.scss";
import VisibilityOffIcon from "../../../public/icons/visibility_off_black_36dp.svg";
import VisibilityIcon from "../../../public/icons/visibility_black_36dp.svg";

interface Inputproperties {
  type?: "text" | "password" | "email" | "";
  placeholder?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  width?: any;
  name?: string;
  register?: any;
  required?: any;
}
export default function InputField({
  type = "text",
  placeholder = "Inter Input",
  style = {},
  fullWidth,
  width,
  name,
  register,
  required,
}: Inputproperties) {
  // STATE FOR INPUT FEILDS

  //STATE HANDLING FOR PASSWORD VISIBILITY
  const [passVisibility, visibilityState] = useState(false);
  const visiToggle = () => {
    visibilityState(!passVisibility);
  };

  type = type || "";

  placeholder = placeholder || `${type[0].toUpperCase()}${type.slice(1)}`;
  if (fullWidth) {
    style = { ...style, width: "100%" };
  } else {
    if (width) style = { ...style, width: width.toString() };
  }

  if (type === "text") {
    return (
      <input
        className={styles.input}
        type={type}
        style={style}
        placeholder={placeholder}
        {...register(name, { ...required })}
      />
    );
  }

  if (type === "password") {
    return (
      <div className={styles.passwordDiv}>
        <input
          className={styles.input}
          type={passVisibility ? "text" : type}
          style={style}
          placeholder={placeholder}
          {...register(name, { ...required })}
        />

        <span className={styles.visiIconDiv} onClick={visiToggle}>
          {passVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
      </div>
    );
  } else {
    return (
      <input
        className={styles.input}
        type={type}
        style={style}
        placeholder={placeholder}
        {...register(name, { ...required })}
      />
    );
  }
}
