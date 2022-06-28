import React, { ReactNode } from "react";
import styles from "./tray.module.scss";

interface TrayTagProps {
  hover?: boolean;
  handleTagClick?: () => void;
  icon: ReactNode;
  placeMent?: "right" | "left";
}

const TrayTag = ({
  handleTagClick = () => {},
  hover = false,
  icon,
  placeMent = "right",
}: TrayTagProps) => {
  return (
    <div
      className={`${styles.filterTaryTag} ${
        hover ? styles.filterTaryHovered : ""
      }
        ${placeMent === "left" ? styles.leftRadius : styles.rightRadius}
      `}
      onClick={handleTagClick}
    >
      {icon}
    </div>
  );
};

export default TrayTag;
