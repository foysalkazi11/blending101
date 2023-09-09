import React, { useState } from "react";
import {
  faChartSimple,
  faClone,
  faEllipsisVertical,
  faTrash,
  faUpDownLeftRight,
  faCartShopping,
  faBlender,
} from "@fortawesome/pro-regular-svg-icons";

import { useAppDispatch } from "../../../../redux/hooks";
import { IPlannerRecipe, setDayRecipe } from "../../../../redux/slices/Planner.slice";

import { RECIPE_CATEGORY_COLOR } from "../../../../data/Recipe";
import CalendarTray from "../../../../theme/calendar/calendarTray.component";
import IconButton from "../../../../component/atoms/Button/IconButton.component";
import { setShowPanel } from "../../../../redux/slices/Ui.slice";
import Icon from "../../../../component/atoms/Icon/Icon.component";

import styles from "./_DayPlan.module.scss";
import { useCopyPlanRecipe, useDeletePlanRecipe, useMovePlanRecipe } from "../../../../hooks/modules/Plan/useMyPlan";
import { useRecipeToGrocery } from "@/recipe/hooks";
import { UserRecipe } from "@/recipe/recipe.types";

interface PlanProps {
  plannerId?: string;
  day?: string;
  date?: string;
  indexValue: number;
  setToggleOptionCard?: any;
  toggleOptionCard?: object;
  recipeList?: UserRecipe[];
  isWeekFromURL?: boolean;
  week?: any;
}

const DayPlan = (props: PlanProps) => {
  const { plannerId, day, date, indexValue, recipeList, week, isWeekFromURL } = props;
  const dispatch = useAppDispatch();

  const copyRecipe = useCopyPlanRecipe(week, isWeekFromURL);
  const moveRecipe = useMovePlanRecipe(plannerId);
  const deleteRecipe = useDeletePlanRecipe(plannerId, week, isWeekFromURL);
  console.log(recipeList);
  return (
    <div className={styles.plan}>
      <div
        className={styles.plan__dateDiv}
        style={indexValue % 2 == 0 ? { backgroundColor: "#eeeeee" } : {}}
        onClick={() => dispatch(setDayRecipe(recipeList[0]?.recipeId._id))}
      >
        <div className={styles.plan__dateDiv__day}>{day}</div>
        <div className={styles.plan__dateDiv__date}>{date}</div>
      </div>
      <div className={styles.plan__recipeDiv}>
        {recipeList?.map((recipe) => (
          <PlanItem
            key={recipe?.recipeId?._id}
            recipe={recipe}
            onDelete={deleteRecipe}
            onCopy={copyRecipe}
            onMove={moveRecipe}
          />
        ))}
      </div>
    </div>
  );
};

export default DayPlan;

interface RecipeColorIndicatorInterface {
  recipe: UserRecipe;
  onCopy?: any;
  onMove?: any;
  onDelete?: any;
}
const PlanItem = (props: RecipeColorIndicatorInterface) => {
  const { recipe, onCopy, onMove, onDelete } = props;
  let { _id, name: recipeName, recipeBlendCategory } = recipe.recipeId;
  let { calorie, gigl, ingredients } = recipe.defaultVersion;

  const category = recipeBlendCategory?.name;
  const rxScore = Math.round(gigl.rxScore);

  const [showMenu, setShowMenu] = useState(false);
  const [showCalender, setShowCalender] = useState<"move" | "copy" | "">("");

  const dispatch = useAppDispatch();
  const addToGrocery = useRecipeToGrocery();

  const style = { backgroundColor: RECIPE_CATEGORY_COLOR[category] };

  if (!recipeName) return null;

  return (
    <div className={styles.recipe}>
      <div className={styles.recipe__containerDiv}>
        <div className={styles.recipe__containerDiv__colorIndicator} style={style} />
        {recipeName}
      </div>

      <div className={styles.recipe__rxScore}>{rxScore}</div>
      <div className={styles.recipe__calories}>{Math.round(calorie.value)}</div>
      <div className={styles.recipe__rxScore}>$0</div>
      <div className={styles.recipe__tray}>
        <IconButton
          size="medium"
          variant="hover"
          fontName={faBlender}
          color="primary"
          onClick={() =>
            dispatch(
              setShowPanel({
                name: "Ingredient",
                show: true,
                payload: ingredients,
              }),
            )
          }
        />
        <IconButton
          size="medium"
          variant="hover"
          fontName={faChartSimple}
          color="primary"
          onClick={() =>
            dispatch(
              setShowPanel({
                name: "RXPanel",
                show: true,
                payload: ingredients?.map((ing) => ({
                  ingredientId: ing?.ingredientId?._id,
                  value: ing?.selectedPortion?.gram,
                })),
              }),
            )
          }
        />
        <IconButton
          size="medium"
          variant="hover"
          fontName={faCartShopping}
          color="primary"
          onClick={() => addToGrocery(_id)}
        />
        <IconButton
          size="medium"
          variant="hover"
          fontName={faEllipsisVertical}
          color="primary"
          onClick={() => setShowMenu((prev) => !prev)}
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
            <Icon fontName={faTrash} size="1.5rem" />
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
            <Icon fontName={faClone} size="1.5rem" />
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
            <Icon fontName={faUpDownLeftRight} size="1.5rem" />
          </span>
        </div>
      </div>
      {showCalender !== "" && (
        <div className={styles.calender}>
          <CalendarTray
            handler={(date) => {
              showCalender === "copy" ? onCopy(date, recipe) : onMove(date, recipe);
              setShowCalender("");
            }}
          />
        </div>
      )}
    </div>
  );
};
