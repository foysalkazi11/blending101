import React, { useState } from "react";
import { format } from "date-fns";

import { UTCDate } from "helpers/Date";

import { MyPlanItem } from "@/app/types/plan.types";

import { UserRecipe } from "@/recipe/recipe.types";
import { useAppDispatch } from "redux/hooks";
import { setDayRecipe } from "redux/slices/Planner.slice";
import { useRecipeToGrocery } from "@/recipe/hooks";
import {
  faBlender,
  faChartSimple,
  faCartShopping,
  faEllipsisVertical,
  faTrash,
  faClone,
  faUpDownLeftRight,
} from "@fortawesome/pro-regular-svg-icons";
import IconButton from "component/atoms/Button/IconButton.component";
import Icon from "component/atoms/Icon/Icon.component";
import { RECIPE_CATEGORY_COLOR } from "data/Recipe";
import { setShowPanel } from "redux/slices/Ui.slice";
import CalendarTray from "theme/calendar/calendarTray.component";

import useCopyRecipe from "@/plan/hooks/my-plan/useCopyRecipe";
import useMoveRecipe from "@/plan/hooks/my-plan/useMoveRecipe";
import useDeleteRecipe from "@/plan/hooks/my-plan/useDeleteRecipe";

import styles from "./PlanListByDate.module.scss";

interface PlanListByDateProps {
  plan?: MyPlanItem[];
  week?: any;
  isWeekFromURL?: boolean;
}

const PlanListByDate = ({ plan }: PlanListByDateProps) => {
  const dispatch = useAppDispatch();

  const copyRecipe = useCopyRecipe();
  const moveRecipe = useMoveRecipe();
  const deleteRecipe = useDeleteRecipe();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <span></span>
        <span>Calorie</span>
        <span>Rx Score</span>
        <span>Price</span>
      </div>
      {/* EACH DAYS OF A PLAN */}
      {plan?.map((planner, index) => {
        const days = UTCDate(planner?.formatedDate);
        const day = format(days, "eee") || "UND";
        const date = format(days, "d") || "0";
        return (
          <div key={planner._id} className={styles.plan}>
            <div
              className={styles.plan__dateDiv}
              style={index % 2 == 0 ? { backgroundColor: "#eeeeee" } : {}}
              onClick={() => dispatch(setDayRecipe(planner.recipes[0]?.recipeId._id))}
            >
              <div className={styles.plan__dateDiv__day}>{day}</div>
              <div className={styles.plan__dateDiv__date}>{date}</div>
            </div>
            <div className={styles.plan__recipeDiv}>
              {/* EACH RECIPES OF A DAY */}
              {planner.recipes?.map((recipe) => (
                <Recipes
                  key={recipe?.recipeId?._id}
                  dayId={planner._id}
                  recipe={recipe}
                  onDelete={deleteRecipe}
                  onCopy={copyRecipe}
                  onMove={moveRecipe}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface RecipesProps {
  dayId: string;
  recipe: UserRecipe;
  onCopy?: (date: string, recipeId: string) => Promise<void>;
  onMove?: (plannerId: string, date: string, recipeId: string) => Promise<void>;
  onDelete?: (plannerId: string, recipeId: string) => Promise<void>;
}

const Recipes = (props: RecipesProps) => {
  const { dayId, recipe, onCopy, onMove, onDelete } = props;
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

      <div className={styles.recipe__rxScore}>{Math.round(calorie.value)}</div>
      <div className={styles.recipe__calories}>{rxScore}</div>
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
        <div className={styles.option} onClick={() => onDelete(dayId, _id)}>
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
              showCalender === "copy" ? onCopy(date, recipe.recipeId._id) : onMove(dayId, date, recipe.recipeId._id);
              setShowCalender("");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PlanListByDate;
