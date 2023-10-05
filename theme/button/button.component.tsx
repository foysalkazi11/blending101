/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useState } from "react";
import Icon from "../../component/atoms/Icon/Icon.component";
import styles from "./button.module.scss";

type ButtonComponentProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?:
    | "text"
    | "primary"
    | "buttonWithIcon"
    | "transparent"
    | "transparentHover"
    | "border";
  fontName?: any;
  value?: string | ReactNode;
  fullWidth?: number;
  width?: number;
  style?: object;
  icon?: string | ReactNode;
  onClick?: () => void;
  children?: string | ReactNode;
};

export default function ButtonComponent({
  variant = "text",
  style = {},
  value = "button",
  fullWidth,
  width,
  icon,
  fontName,
  onClick,
  children,
  ...rest
}: ButtonComponentProps) {
  // STEP 1: INITIALIZE PROPS TO AVOID UI FALL
  if (!children && typeof value === "string") {
    children = value;
  }
  if (fullWidth) style = { ...style, width: "100%" };
  if (width) style = { ...style, width: width };
  icon = icon || "/images/formulate.svg";

  const clickHandler = () => {
    onClick && onClick();
  };

  // CASE PRIMARY: IF variant IS PRIMARY RETURN PRIMARY BUTTON
  if (variant === "primary")
    return (
      <button
        className={styles.button + " " + styles.primary}
        style={style}
        onClick={clickHandler}
        {...rest}
      >
        {children}
      </button>
    );
  if (variant === "buttonWithIcon")
    return (
      <button
        className={styles.button + " " + styles.primary}
        style={style}
        onClick={clickHandler}
        {...rest}
      >
        {typeof icon === "string" ? (
          <img src={icon} alt="icon" className={styles.icon} />
        ) : (
          <div className={styles.icon}>{icon}</div>
        )}

        {children}
      </button>
    );

  if (fontName)
    return (
      <button
        className={styles.button + " " + styles.primary}
        style={style}
        onClick={clickHandler}
        {...rest}
      >
        <Icon fontName={fontName} size={"2rem"} />
        <span className="ml-10">{children}</span>
      </button>
    );

  // CASE TRANSPARENT: RETURN TRANSPARENT BUTTON
  if (variant === "transparent")
    return (
      <button
        className={styles.button + " " + styles.transparent}
        style={style}
        onClick={clickHandler}
        {...rest}
      >
        {children}
      </button>
    );

  if (variant === "transparentHover")
    return (
      <button
        className={styles.button + " " + styles.transparent__hover}
        style={style}
        onClick={clickHandler}
        {...rest}
      >
        {children}
      </button>
    );

  if (variant === "border")
    return (
      <button
        className={styles.border__button}
        style={style}
        onClick={clickHandler}
        {...rest}
      >
        {children}
      </button>
    );

  // CASE DEFAULT: RETURN WHITE BUTTON
  return (
    <button
      className={styles.button}
      style={style}
      onClick={clickHandler}
      {...rest}
    >
      {children}
    </button>
  );
}
