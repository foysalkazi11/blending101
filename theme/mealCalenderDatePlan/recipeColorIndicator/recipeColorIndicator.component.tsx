import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import OptionIconCard from "./optionIconCard/optionIconCard.component";
import styles from "./recipeColorIndicator.module.scss";
import { BsCartPlus } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
import { RECIPE_CATEGORY_COLOR } from "../../../data/Recipe";
import { IPlannerRecipe } from "../../../redux/slices/Planner.slice";

interface RecipeColorIndicatorInterface {
  recipe: IPlannerRecipe;
  optionToggle?: boolean;
  toggleOptionCard?: object;
  setToggleOptionCard?: any;
  day?: string;
  date?: string;
  onDelete?: any;
}

const RecipeColorIndicator = ({
  recipe,
  optionToggle,
  toggleOptionCard,
  setToggleOptionCard,
  date,
  day,
  onDelete,
}: RecipeColorIndicatorInterface) => {
  const { _id, name: recipeName, calorie, category, rxScore } = recipe;

  const style = { backgroundColor: RECIPE_CATEGORY_COLOR[category] };

  const handleOptionIcon = (recipeVal: any, dateVal: any, dayVal: any) => {
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
      <div className={styles.mainContainer__containerDiv}>
        <div
          className={styles.mainContainer__containerDiv__colorIndicator}
          style={style}
        />
        {recipeName}
      </div>

      <div className={styles.mainContainer__rxScore}>{rxScore}</div>
      <div className={styles.mainContainer__calories}>{calorie}</div>
      <div className={styles.mainContainer__tray}>
        <BiBarChart
          className={styles.mainContainer__tray__icons}
          style={{ fontSize: "22px" }}
        />
        <BsCartPlus className={styles.mainContainer__tray__icons} />
        <HiOutlineDotsVertical
          onClick={() => handleOptionIcon(recipeName, date, day)}
          className={styles.mainContainer__tray__icons}
        />
      </div>

      <div
        className={styles.mainContainer__optionTray}
        style={
          optionToggle ? { display: "block", zIndex: "1" } : { zIndex: "-1" }
        }
      >
        <div className={styles.mainContainer__optionTray__pointingDiv} />
        <OptionIconCard
          text="Remove"
          icon={<RiDeleteBin6Line />}
          onClick={() => onDelete(_id)}
        />
        <OptionIconCard text="Copy" icon={<IoCopy />} />
        <OptionIconCard text="Move" icon={<IoCopy />} />
      </div>
    </div>
  );
};

export default RecipeColorIndicator;
