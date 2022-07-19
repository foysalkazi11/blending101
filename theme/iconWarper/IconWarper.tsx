import React from "react";
import styles from "./Icon.module.scss";

interface IconProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  handleClick?: (e: React.SyntheticEvent) => void;
  hover?: "bgPrimary" | "bgSecondary" | "bgSlightGray";
  defaultBg?: "gray" | "primary" | "secondary" | "none";
}

const IconWarper = ({
  children,
  style = {},
  handleClick = () => {},
  hover = "bgPrimary",
  defaultBg = "none",
}: IconProps) => {
  return (
    <div
      className={`${styles.iconContainer} hvr-pop ${styles[defaultBg]} ${styles[hover]}`}
      style={style}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default IconWarper;
