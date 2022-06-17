/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";
import styles from "./tray.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setOpenCollectionsTary } from "../../redux/slices/sideTraySlice";
import { setChangeRecipeWithinCollection } from "../../redux/slices/collectionSlice";
import useHover from "../utility/useHover";

interface leftTrayInterface {
  children: ReactNode;
}

export default function LeftTrayWrapper({ children }: leftTrayInterface) {
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  const [hoevrRef, hover] = useHover();

  const handleClick = () => {
    dispatch(setOpenCollectionsTary(!openCollectionsTary));
    dispatch(setChangeRecipeWithinCollection(false));
  };

  return (
    <div
      className={`${styles.tray} ${openCollectionsTary ? styles.open : ""}`}
      ref={hoevrRef}
    >
      <div className={styles.tray__inner}>
        <div
          className={`${styles.image} ${hover ? styles.hovered : ""}`}
          onClick={() => {
            handleClick();
          }}
        >
          <img
            src={
              hover
                ? "/icons/left__drawer__orange.svg"
                : "/icons/left__drawer.svg"
            }
            alt="Icon"
          />
        </div>

        {children}
      </div>
    </div>
  );
}
