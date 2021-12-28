/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "./tray.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setOpenFilterTray } from "../../redux/slices/sideTraySlice";

interface leftTrayInterface {
  filter?: false;
  children: any;
  id?: string;
}

export default function LeftTrayWrapper({
  children,
  filter,
  id,
}: leftTrayInterface) {
  const [openFilterTray, setOpenFilterTrat] = useState(false);

  const ref = useRef<any>();

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
    setOpenFilterTrat(() => !openFilterTray);
  };

  return (
    <div className={styles.tray} ref={ref} id={id}>
      <div className={styles.tray__inner}>
        {openFilterTray ? (
          <div className={styles.image} onClick={handleClick}>
            <img src="/icons/left__drawer__orange.svg" alt="drawer__orange" />
          </div>
        ) : filter ? null : (
          <div
            className={styles.image + " " + styles.image__white}
            onClick={handleClick}
          >
            <img src="/icons/left__drawer.svg" alt="drawer" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
