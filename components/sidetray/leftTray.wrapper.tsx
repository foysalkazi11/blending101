/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "./tray.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setOpenCollectionsTary } from "../../redux/slices/sideTraySlice";
import { setChangeRecipeWithinCollection } from "../../redux/slices/collectionSlice";
import useHover from "../utility/useHover";

interface leftTrayInterface {
  filter?: boolean;
  children: any;
  id?: string;
}

export default function LeftTrayWrapper({
  children,
  filter = false,
  id,
}: leftTrayInterface) {
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  const ref = useRef<any>();
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoevrRef, hover] = useHover();

  useEffect(() => {
    // const elem = ref.current;
    // if (!elem) return;
    // if (openCollectionsTary) {
    //   elem.style.left = "0";
    // } else {
    //   elem.style.left = "-293px";
    // }

    if (openCollectionsTary) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [openCollectionsTary]);

  const handleClick = () => {
    setOpen((pre) => !pre);
    dispatch(setOpenCollectionsTary(!openCollectionsTary));
    dispatch(setChangeRecipeWithinCollection(false));
  };

  return (
    <div
      className={`${styles.tray} ${open ? styles.open : ""}`}
      id={id}
      ref={hoevrRef}
    >
      <div className={styles.tray__inner}>
        {openCollectionsTary ? (
          <div
            className={`${styles.image} ${styles.image__white} ${
              hover ? styles.hovered : ""
            }`}
            onClick={() => {
              handleClick();
            }}
          >
            <img src="/icons/left__drawer__orange.svg" alt="drawer__orange" />
          </div>
        ) : filter ? null : (
          <div
            className={styles.imageContained + " " + styles.image__white}
            onClick={() => {
              handleClick();
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={
                isHovered
                  ? "/icons/left__drawer__orange.svg"
                  : "/icons/left__drawer.svg"
              }
              alt="drawer"
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
