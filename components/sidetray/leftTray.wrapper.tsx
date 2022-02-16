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

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;
    if (openCollectionsTary) {
      elem.style.left = "0";
    } else {
      elem.style.left = "-293px";
    }
  }, [openCollectionsTary]);

  const handleClick = () => {
    dispatch(setOpenCollectionsTary(!openCollectionsTary));
    dispatch(setChangeRecipeWithinCollection(false));
  };

  return (
    <div className={styles.tray} ref={ref} id={id}>
      <div className={styles.tray__inner}>
        {openCollectionsTary ? (
          <div
            className={styles.image + " " + styles.image__white}
            onClick={() => {
              handleClick();
            }}
          >
            <img src="/icons/left__drawer__orange.svg" alt="drawer__orange" />
          </div>
        ) : filter ? null : (
          <div
            className={styles.imageContained + " " + styles.image__white}
            onClick={handleClick}
            //@ts-ignore
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <img src="/icons/left__drawer__orange.svg" alt="drawer__orange" />
            ) : (
              <img src="/icons/left__drawer.svg" alt="drawer" />
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
