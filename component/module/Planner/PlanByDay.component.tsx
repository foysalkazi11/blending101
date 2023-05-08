import React, { Fragment, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  faChartSimple,
  faCartShopping,
  faEllipsisVertical,
  faTrash,
  faClone,
  faUpDownLeftRight,
} from "@fortawesome/pro-light-svg-icons";

import CalendarTray from "../../../theme/calendar/calendarTray.component";
import IconButton from "../../atoms/Button/IconButton.component";
import Icon from "../../atoms/Icon/Icon.component";

import Publish from "../../../helpers/Publish";
import { ADD_TO_GROCERY_LIST } from "../../../graphql/Planner";
import { RECIPE_CATEGORY_COLOR } from "../../../data/Recipe";
import {
  useCopyPlanRecipe,
  useMovePlanRecipe,
  useDeletePlanRecipe,
} from "../../../hooks/modules/Plan/useMyPlan";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  IPlannerRecipe,
  setDayRecipe,
} from "../../../redux/slices/Planner.slice";
import { setShowPanel } from "../../../redux/slices/Ui.slice";

import styles from "./PlanByDay.module.scss";

interface PlanListProps {
  data?: any[];
  week?: any;
  isWeekFromURL?: boolean;
  cart?: boolean;
  action?: boolean;
  onRemove?: any;
}

const PlanList = (props: PlanListProps) => {
  const { data, week, isWeekFromURL, cart, action, onRemove } = props;
  const [toggleOptionCard, setToggleOptionCard] = useState({});
  return (
    <div className={styles.wrapper}>
      {data?.map((planner, index) => {
        return (
          <DayPlan
            key={planner.id}
            plannerId={planner.id}
            indexValue={index}
            day={"Day"}
            date={`${index + 1}`}
            week={week}
            cart={cart}
            action={action}
            recipeList={planner.recipes}
            isWeekFromURL={isWeekFromURL}
            setToggleOptionCard={setToggleOptionCard}
            toggleOptionCard={toggleOptionCard}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
};

export default PlanList;

interface PlanProps {
  plannerId?: string;
  day?: string;
  date?: string;
  indexValue: number;
  setToggleOptionCard?: any;
  toggleOptionCard?: object;
  recipeList?: IPlannerRecipe[];
  isWeekFromURL?: boolean;
  week?: any;
  cart?: boolean;
  action?: boolean;
  onRemove?: any;
}

const DayPlan = (props: PlanProps) => {
  const {
    plannerId,
    day,
    date,
    indexValue,
    recipeList,
    week,
    isWeekFromURL,
    cart,
    action,
    onRemove,
  } = props;
  const dispatch = useAppDispatch();

  const copyRecipe = useCopyPlanRecipe(week, isWeekFromURL);
  const moveRecipe = useMovePlanRecipe(plannerId);
  const deleteRecipe = useDeletePlanRecipe(plannerId, week, isWeekFromURL);

  return (
    <div className={styles.plan}>
      <div
        className={styles.plan__dateDiv}
        style={indexValue % 2 == 0 ? { backgroundColor: "#eeeeee" } : {}}
        onClick={() => dispatch(setDayRecipe(recipeList[0]?._id))}
      >
        <div className={styles.plan__dateDiv__day}>{day}</div>
        <div className={styles.plan__dateDiv__date}>{date}</div>
      </div>
      <div className={styles.plan__recipeDiv}>
        {recipeList?.map((recipe) => (
          <PlanItem
            key={recipe?._id}
            plannerId={date}
            cart={cart}
            action={action}
            recipe={recipe}
            onRemove={onRemove}
            onDelete={deleteRecipe}
            onCopy={copyRecipe}
            onMove={moveRecipe}
          />
        ))}
      </div>
    </div>
  );
};

interface RecipeColorIndicatorInterface {
  recipe: any;
  plannerId: string;
  onCopy?: any;
  onMove?: any;
  onDelete?: any;
  cart?: boolean;
  action?: boolean;
  onRemove?: any;
}
const PlanItem = (props: RecipeColorIndicatorInterface) => {
  const {
    recipe,
    plannerId,
    onCopy,
    onMove,
    onDelete,
    cart,
    action,
    onRemove,
  } = props;
  let {
    _id,
    name: recipeName,
    calorie,
    category,
    recipeBlendCategory,
    rxScore,
  } = recipe;
  const ingredients = recipe?.defaultVersion?.ingredients || [];
  category = recipeBlendCategory?.name || category;
  const [showMenu, setShowMenu] = useState(false);
  const [showCalender, setShowCalender] = useState<"move" | "copy" | "">("");

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [addToGrocery, addState] = useMutation(ADD_TO_GROCERY_LIST, {
    refetchQueries: ["GetCartData"],
  });

  const style = { backgroundColor: RECIPE_CATEGORY_COLOR[category] };

  if (!recipeName) return null;

  const addToGroceryList = async () => {
    await Publish({
      mutate: addToGrocery,
      variables: {
        recipeId: _id,
        memberId: userId,
      },
      state: addState,
      success: `Added Ingredients to the Grocery List`,
    });
  };

  return (
    <div className={styles.recipe}>
      <div className={styles.recipe__containerDiv}>
        <div
          className={styles.recipe__containerDiv__colorIndicator}
          style={style}
        />
        {recipeName}
      </div>
      <div className={styles.recipe__rxScore}>{rxScore || 786}</div>
      <div className={styles.recipe__calories}>{calorie || 54}</div>
      <div className={styles.recipe__tray}>
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
        {cart && (
          <IconButton
            size="medium"
            variant="hover"
            fontName={faCartShopping}
            color="primary"
            onClick={addToGroceryList}
          />
        )}
        {onRemove && (
          <IconButton
            size="medium"
            variant="hover"
            fontName={faTrash}
            color="primary"
            onClick={() => onRemove(plannerId, _id)}
          />
        )}
        {action && (
          <IconButton
            size="medium"
            variant="hover"
            fontName={faEllipsisVertical}
            color="primary"
            onClick={() => setShowMenu((prev) => !prev)}
          />
        )}
      </div>
      {action && (
        <Fragment>
          <div
            className={styles.recipe__optionTray}
            style={
              showMenu ? { display: "block", zIndex: "1" } : { zIndex: "-1" }
            }
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
                  showCalender === "copy"
                    ? onCopy(date, recipe)
                    : onMove(date, recipe);
                  setShowCalender("");
                }}
              />
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};
