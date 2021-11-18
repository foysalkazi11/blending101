import React, { useState } from "react";
import styles from "./button.module.scss";

interface buttonInterface {
  type: string;
  value: string;
  fullWidth?: number;
  width?: number;
  style?: object;
}

export default function ButtonComponent({
  type,
  style,
  value,
  fullWidth,
  width,
}: buttonInterface) {
  // STEP 1: INITIALIZE PROPS TO AVOID UI FALL
  type = type || "text";
  style = style || {};
  if (fullWidth) style = { ...style, width: "100%" };
  if (width) style = { ...style, width: width };
  value = value || type;

  // CASE PRIMARY: IF TYPE IS PRIMARY RETURN PRIMARY BUTTON
  if (type === "primary")
    return (
      <button className={styles.button + " " + styles.primary} style={style}>
        {value}
      </button>
    );

  // CASE TRANSPARENT: RETURN TRANSPARENT BUTTON
  if (type === "transparent")
    return (
      <button
        className={styles.button + " " + styles.transparent}
        style={style}
      >
        {value}
      </button>
    );

  if (type === "transparentHover")
    return (
      <button
        className={styles.button + " " + styles.transparent__hover}
        style={style}
      >
        {value}
      </button>
    );

  if (type === "border")
    return (
      <button className={styles.border__button} style={style}>
        {value}
      </button>
    );

  // CASE DEFAULT: RETURN WHITE BUTTON
  return (
    <button className={styles.button} style={style}>
      {value}
    </button>
  );
}
