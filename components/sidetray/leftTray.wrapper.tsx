/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "./tray.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setOpenFilterTray } from "../../redux/slices/sideTraySlice";

export default function LeftTrayWrapper(props) {
  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();

  const ref = useRef<any>();
  const reff = useRef<any>();

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;
    if (openFilterTray) {
      elem.style.left = "0";
    } else {
      elem.style.left = "-293px";
    }
  }, [openFilterTray]);

  const handleClick = () => {
    dispatch(setOpenFilterTray(!openFilterTray));
  };

  return (
    <div className={styles.tray} ref={ref}>
      <div className={styles.tray__inner}>
        {openFilterTray ? (
          <div className={styles.image} onClick={handleClick}>
            <img src="/icons/left__drawer__orange.svg" alt="drawer__orange" />
          </div>
        ) : (
          <div
            className={styles.image + " " + styles.image__white}
            onClick={handleClick}
          >
            <img src="/icons/left__drawer.svg" alt="drawer" />
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
}
