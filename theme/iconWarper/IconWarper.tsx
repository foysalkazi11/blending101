import React from "react";
import styles from "./Icon.module.scss";

type IconProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  style?: React.CSSProperties;
  handleClick?: (e: React.SyntheticEvent) => void;
  hover?: "bgPrimary" | "bgSecondary" | "bgGray" | "bgSlightGray" | "none";
  defaultBg?: "gray" | "primary" | "secondary" | "slightGray" | "none" | "slightDark";
  iconColor?: "iconColorPrimary" | "iconColorSecondary" | "iconColorWhite" | "iconColorDefault";
};

const IconWarper = ({
  children,
  style = {},
  handleClick = () => {},
  hover = "bgPrimary",
  defaultBg = "none",
  iconColor = "iconColorDefault",
  ...rest
}: IconProps) => {
  return (
    <button
      className={`${styles.iconContainer} ${styles[iconColor]} ${styles[defaultBg]} ${styles[hover]}  hvr-pop`}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconWarper;
