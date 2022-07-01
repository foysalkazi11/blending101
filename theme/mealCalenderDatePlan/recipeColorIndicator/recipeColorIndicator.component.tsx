import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import OptionIconCard from "./optionIconCard/optionIconCard.component";
import styles from "./recipeColorIndicator.module.scss";

interface RecipeColorIndicatorInterface {
  color?: string;
  recipeName?: string;
  optionToggle?: boolean;
  toggleOptionCard?: object;
  setToggleOptionCard?: any;
  day?: string;
  date?: number;
}

const RecipeColorIndicator = ({
  color,
  recipeName,
  optionToggle,
  toggleOptionCard,
  setToggleOptionCard,
  date,
  day,
}: RecipeColorIndicatorInterface) => {
  color = color || "gray";
  recipeName = recipeName || "";

  const style = { backgroundColor: color };
  const handleOptionIcon = (
    recipeVal: any,
    dateVal: any,
    dayVal: any
  ) => {
    if (
      // @ts-ignore
      dateVal === toggleOptionCard?.date &&
      // @ts-ignore
      dayVal === toggleOptionCard?.day &&
      // @ts-ignore
      recipeVal === toggleOptionCard?.recipe
    ) {
      setToggleOptionCard({});
    } else {
      setToggleOptionCard({
        date: dateVal,
        day: dayVal,
        recipe: recipeVal,
      });
    }
  };

  if (!recipeName) return null;

  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.mainContainer__colorIndicator}
        style={style}
      />
      {recipeName}
      <HiOutlineDotsVertical
        onClick={() => handleOptionIcon(recipeName, date, day)}
        className={styles.mainContainer__optionIcon}
      />

      <div
        className={styles.mainContainer__optionTray}
        style={
          optionToggle
            ? { display: "block", zIndex: "1" }
            : { zIndex: "-1" }
        }
      >
        <div
          className={styles.mainContainer__optionTray__pointingDiv}
        />
        <OptionIconCard text="Remove" icon={<RiDeleteBin6Line />} />
        <OptionIconCard text="Copy" icon={<IoCopy />} />
        <OptionIconCard text="Move" icon={<IoCopy />} />
      </div>
    </div>
  );
};

export default RecipeColorIndicator;
