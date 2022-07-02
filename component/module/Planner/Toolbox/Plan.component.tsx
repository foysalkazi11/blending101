import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";

import { useAppDispatch } from "../../../../redux/hooks";
import {
  deleteRecipe,
  duplicateRecipe,
  IPlannerRecipe,
  moveRecipe,
} from "../../../../redux/slices/Planner.slice";
import { RECIPE_CATEGORY_COLOR } from "../../../../data/Recipe";
import CalendarTray from "../../../../theme/calendar/calendarTray.component";

import styles from "./Plan.module.scss";

interface PlanProps {
  plannerId?: string;
  day?: string;
  date?: string;
  indexValue: number;
  setToggleOptionCard?: any;
  toggleOptionCard?: object;
  recipeList?: IPlannerRecipe[];
}

const Plan = (props: PlanProps) => {
  const { plannerId, day, date, indexValue, recipeList } = props;
  const dispatch = useAppDispatch();

  if (!day && !date) return null;

  const deleteHandler = (id) => {
    dispatch(deleteRecipe({ recipeId: id, plannerId: plannerId }));
  };

  const copyHandler = (date, recipe) => {
    dispatch(duplicateRecipe({ date, recipe }));
  };

  const moveHandler = (date, recipe) => {
    dispatch(moveRecipe({ plannerId, date, recipe }));
  };

  return (
    <div className={styles.plan}>
      <div
        className={styles.plan__dateDiv}
        style={indexValue % 2 == 0 ? { backgroundColor: "#eeeeee" } : {}}
      >
        <div className={styles.plan__dateDiv__day}>{day}</div>
        <div className={styles.plan__dateDiv__date}>{date}</div>
      </div>
      <div className={styles.plan__recipeDiv}>
        {recipeList?.map((recipe) => (
          <PlanRecipe
            key={recipe?._id}
            recipe={recipe}
            onDelete={deleteHandler}
            onCopy={copyHandler}
            onMove={moveHandler}
          />
        ))}
      </div>
    </div>
  );
};

interface RecipeColorIndicatorInterface {
  recipe: IPlannerRecipe;
  onCopy?: any;
  onMove?: any;
  onDelete?: any;
}
const PlanRecipe = ({
  recipe,
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
    <div className={styles.recipe}>
      <div className={styles.recipe__containerDiv}>
        <div
          className={styles.recipe__containerDiv__colorIndicator}
          style={style}
        />
        {recipeName}
      </div>

      <div className={styles.recipe__rxScore}>{rxScore}</div>
      <div className={styles.recipe__calories}>{calorie}</div>
      <div className={styles.recipe__tray}>
        <BiBarChart
          className={styles.recipe__tray__icons}
          style={{ fontSize: "22px" }}
        />
        <BsCartPlus className={styles.recipe__tray__icons} />
        <HiOutlineDotsVertical
          onClick={() => setShowMenu((prev) => !prev)}
          className={styles.recipe__tray__icons}
        />
      </div>

      <div
        className={styles.recipe__optionTray}
        style={showMenu ? { display: "block", zIndex: "1" } : { zIndex: "-1" }}
      >
        <div className={styles.recipe__optionTray__pointingDiv} />
        <div className={styles.option} onClick={() => onDelete(_id)}>
          <span>Remove</span>
          <span className={styles.option__icon}>
            <RiDeleteBin6Line />
          </span>
        </div>
        <div
          className={styles.option}
          onClick={() => {
            setShowCalender("copy");
            setShowMenu(false);
          }}
        >
          <span>Copy</span>
          <span className={styles.option__icon}>
            <IoCopy />
          </span>
        </div>
        <div
          className={styles.option}
          onClick={() => {
            setShowCalender("move");
            setShowMenu(false);
          }}
        >
          <span>Move</span>
          <span className={styles.option__icon}>
            <IoCopy />
          </span>
        </div>
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

export default Plan;
