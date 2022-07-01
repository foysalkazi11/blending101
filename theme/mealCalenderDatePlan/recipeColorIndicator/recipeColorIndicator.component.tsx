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
import CalendarTray from "../../calendar/calendarTray.component";

interface RecipeColorIndicatorInterface {
  recipe: IPlannerRecipe;
  optionToggle?: boolean;
  toggleOptionCard?: object;
  setToggleOptionCard?: any;
  day?: string;
  date?: string;
  onCopy?: any;
  onMove?: any;
  onDelete?: any;
}

const RecipeColorIndicator = ({
  recipe,
  optionToggle,
  toggleOptionCard,
  setToggleOptionCard,
  date,
  day,
  onCopy,
  onMove,
  onDelete,
}: RecipeColorIndicatorInterface) => {
  const { _id, name: recipeName, calorie, category, rxScore } = recipe;

  const [showMenu, setShowMenu] = useState(false);
  const [showCalender, setShowCalender] = useState<"move" | "copy" | "">("");

  const style = { backgroundColor: RECIPE_CATEGORY_COLOR[category] };

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
          onClick={() => setShowMenu((prev) => !prev)}
          className={styles.mainContainer__tray__icons}
        />
      </div>

      <div
        className={styles.mainContainer__optionTray}
        style={showMenu ? { display: "block", zIndex: "1" } : { zIndex: "-1" }}
      >
        <div className={styles.mainContainer__optionTray__pointingDiv} />
        <OptionIconCard
          text="Remove"
          icon={<RiDeleteBin6Line />}
          onClick={() => onDelete(_id)}
        />
        <OptionIconCard
          text="Copy"
          icon={<IoCopy />}
          onClick={() => {
            setShowCalender("copy");
            setShowMenu(false);
          }}
        />
        <OptionIconCard
          text="Move"
          icon={<IoCopy />}
          onClick={() => {
            setShowCalender("move");
            setShowMenu(false);
          }}
        />
      </div>
      {showCalender !== "" && (
        <div className={styles.calender}>
          <CalendarTray
            handler={(date) => {
              showCalender === "copy"
                ? onCopy(date, recipe)
                : onMove(date, recipe);
              setShowCalender("");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeColorIndicator;
