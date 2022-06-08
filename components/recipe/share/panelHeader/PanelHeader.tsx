import Image from "next/image";
import React from "react";
import styles from "./PanelHeader.module.scss";

interface PanelHeaderProps {
  icon?: string;
  title?: string;
  rightSide?: React.ReactNode;
}

const PanelHeader = ({
  icon = "/icons/chart-bar-light-green.svg",
  title = "Rx Facts",
  rightSide = <div></div>,
}: PanelHeaderProps) => {
  return (
    <div className={styles.headingContainer}>
      <div className={styles.recipeHeadingTopSec}>
        <Image src={icon} alt="Picture will load soon" width={22} height={22} />

        <h3>{title}</h3>
      </div>
      {rightSide}
    </div>
  );
};

export default PanelHeader;
