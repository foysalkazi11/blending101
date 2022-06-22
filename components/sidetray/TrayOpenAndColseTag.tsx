import React, { ReactNode } from "react";
import { FiFilter } from "react-icons/fi";
import styles from "./tray.module.scss";

interface TrayOpenAndColseTag {
  hover?: boolean;
  handleTagClick: () => void;
  icon: React.ReactNode;
  placeMent?: "right" | "left";
}

const TrayOpenAndColseTag = ({
  handleTagClick,
  hover,
  icon,
  placeMent = "right",
}: TrayOpenAndColseTag) => {
  return (
    <div
      className={`${styles.filterTaryTag} 
        ${placeMent === "left" ? styles.rightRadius : styles.leftRadius}
      `}
      onClick={handleTagClick}
    >
      {icon}
      {/* <FiFilter style={{ color: hover ? "#fff" : "#fe5d1f" }} /> */}
    </div>
  );
};

export default TrayOpenAndColseTag;

// ${hover ? styles.filterTaryHovered : ""}
