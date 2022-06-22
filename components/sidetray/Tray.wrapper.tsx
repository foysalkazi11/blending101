/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";
import styles from "./tray.module.scss";
import useHover from "../utility/useHover";

interface leftTrayInterface {
  children: ReactNode;
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
  openTray?: boolean;
  closeTray?: () => void;
  panleTag?: ReactNode;
  iconDefault?: string;
  iconWhenHover?: string;
}

export default function LeftTrayWrapper({
  children,
  showTagByDefaut = true,
  showPanle = "left",
  closeTray = () => {},
  openTray = false,
  iconWhenHover = "/icons/left__drawer__orange.svg",
  iconDefault = "/icons/left__drawer.svg",
}: leftTrayInterface) {
  const [hoevrRef, hover] = useHover();

  const handleClick = () => {
    closeTray();
  };

  return (
    <div
      className={`${styles.tray} `}
      ref={hoevrRef}
      style={
        showPanle === "left"
          ? { left: openTray ? "0px" : "-300px" }
          : { right: openTray ? "0px" : "-300px" }
      }
    >
      <div className={styles.tray__inner}>
        <div
          className={`${styles.image}`}
          onClick={() => {
            handleClick();
          }}
          style={
            showPanle === "left"
              ? { right: hover ? "-45px" : "-35px" }
              : { left: hover ? "-35px" : "-25px" }
          }
        >
          {!openTray && !showTagByDefaut ? null : (
            <img src={hover ? iconWhenHover : iconDefault} alt="Icon" />
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
