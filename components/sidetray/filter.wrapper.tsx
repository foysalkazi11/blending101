/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";
import styles from "./tray.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setOpenFilterTray } from "../../redux/slices/sideTraySlice";
import useHover from "../utility/useHover";
import { FiFilter } from "react-icons/fi";

interface leftTrayInterface {
  children: ReactNode;
  filter: any;
  id: any;
}

export default function FilterTrayWrapper({ children }: leftTrayInterface) {
  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  const [hoevrRef, hover] = useHover();

  const handleClick = () => {
    dispatch(setOpenFilterTray(!openFilterTray));
  };

  return (
    <div
      className={`${styles.tray} ${openFilterTray ? styles.open : ""}`}
      ref={hoevrRef}
    >
      <div className={styles.tray__inner}>
        {openFilterTray ? (
          <div
            className={`${styles.filterTaryTag} ${
              hover ? styles.filterTaryHovered : ""
            }`}
            onClick={handleClick}
          >
            <FiFilter style={{ color: hover ? "#fff" : "#fe5d1f" }} />
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
