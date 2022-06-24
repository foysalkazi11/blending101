import React from "react";
import styles from "./Icon.module.scss";

interface IconProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  handleClick?: () => void;
  hover?: "bgPrimary" | "bgSecondary" | "bgSlightGray";
}

const IconWraper = ({
  children,
  style = {},
  handleClick = () => {},
  hover = "bgPrimary",
}: IconProps) => {
  return (
    <div
      className={`${styles.iconContainer} ${styles[hover]}`}
      style={style}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default IconWraper;
