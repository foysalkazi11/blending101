import React from "react";
import styles from "./Icon.module.scss";

interface IconProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  handleClick?: (e: React.SyntheticEvent) => void;
  hover?: "bgPrimary" | "bgSecondary" | "bgGray" | "bgSlightGray" | "none";
  defaultBg?: "gray" | "primary" | "secondary" | "slightGray" | "none";
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
      className={`${styles.iconContainer} ${styles[defaultBg]} ${styles[hover]}  hvr-pop`}
      style={style}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default IconWarper;
