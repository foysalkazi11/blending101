import React, { useState } from "react";
import styles from "./inputField.module.scss";
import VisibilityOffIcon from "../../public/icons/visibility_off_black_36dp.svg";
import VisibilityIcon from "../../public/icons/visibility_black_36dp.svg";

interface Inputproperties {
  type: "text" | "password" | "email" | "";
  value: string;
  setValue?: any;
  placeholder: string;
  style?: Object;
  fullWidth?: boolean;
  width?: any;
}
export default function InputField({
  type,
  value,
  setValue,
  placeholder,
  style,
  fullWidth,
  width,
}: Inputproperties) {
  // STATE FOR INPUT FEILDS
  const [text, setText] = useState("");

  //STATE HANDLING FOR PASSWORD VISIBILITY
  const [passVisibility, visibilityState] = useState(false);
  const visiToggle = () => {
    visibilityState(!passVisibility);
  };

  type = type || "";
  value = value || text;
  placeholder = placeholder || `${type[0].toUpperCase()}${type.slice(1)}`;
  if (fullWidth) {
    style = { ...style, width: "100%" };
  } else {
    if (width) style = { ...style, width: width.toString() };
  }

  // Change value and return it
  const onChange = (e) => {
    const val = e.target.value;
    if (setValue) {
      setValue(val);
    } else {
      setText(val);
    }
  };

  //Type Of Feild Needed {text,password,email}

  if (type === "text") {
    return (
      <input
        className={styles.input}
        type={type}
        style={style}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
          value={value}
          onChange={onChange}
        />

        <span className={styles.visiIconDiv} onClick={visiToggle}>
          {/* <Image
            src="/icons/eye-icon.png"
            alt="Icon will soon load"
            height={"100%"}
            width={"100%"}
            layout="responsive"
            objectFit="contain"
          /> */}
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
        value={value}
        onChange={onChange}
      />
    );
  }
}
