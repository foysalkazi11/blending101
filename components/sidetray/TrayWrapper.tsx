/* eslint-disable @next/next/no-img-element */
import React, { FC, ReactNode } from "react";
import styles from "./tray.module.scss";
import useHover from "../utility/useHover";

interface leftTrayInterface {
  children: ReactNode;
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
  openTray?: boolean;
  closeTray?: () => void;
  panleTag?: (hover: boolean) => ReactNode;
}

export default function TrayWrapper({
  children,
  showTagByDefaut = true,
  showPanle = "left",
  closeTray = () => {},
  openTray = false,
  panleTag = (hover: boolean) => (
    <img
      src={
        hover ? "/icons/left__drawer__orange.svg" : "/icons/left__drawer.svg"
      }
      alt="Icon"
    />
  ),
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
              ? { right: hover ? "5px" : "20px" }
              : { left: hover ? "-40px" : "-25px" }
          }
        >
          {!openTray && !showTagByDefaut ? null : panleTag(hover)}
        </div>

        {children}
      </div>
    </div>
  );
}
