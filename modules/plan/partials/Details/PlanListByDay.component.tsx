import React from "react";
import { useMutation } from "@apollo/client";
import { faChartSimple, faCartShopping, faTrash, faBlender } from "@fortawesome/pro-light-svg-icons";

import IconButton from "../../../../component/atoms/Button/IconButton.component";

import { RECIPE_CATEGORY_COLOR } from "../../../../data/Recipe";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { IPlannerRecipe, setDayRecipe } from "../../../../redux/slices/Planner.slice";
import { setShowPanel } from "../../../../redux/slices/Ui.slice";

import { useDrag, useDrop } from "react-dnd";
import { useRecipeToGrocery } from "@/recipe/hooks";
import styles from "./PlanListByDay.module.scss";

interface PlanListProps {
  data?: any[];
  week?: any;
  isWeekFromURL?: boolean;
  cart?: boolean;
  action?: boolean;
  onMoveRecipe?: any;
  onRemove?: any;
}

const PlanList = (props: PlanListProps) => {
  const { data, cart, onRemove, onMoveRecipe } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <span></span>
        <span>Calorie</span>
        <span>Rx Facts</span>
        <span>Price</span>
      </div>
      {data?.map((planner, index) => {
        return (
          <DayPlan
            key={planner.id}
            plannerId={planner.id}
            indexValue={index}
            day="Day"
            date={`${index + 1}`}
            cart={cart}
            recipeList={planner.recipes}
            onRemove={onRemove}
            onMoveRecipe={onMoveRecipe}
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
  recipeList?: IPlannerRecipe[];
  cart?: boolean;
  onRemove?: any;
  onMoveRecipe?: any;
}

const DayPlan = (props: PlanProps) => {
  const { plannerId, day, date, indexValue, recipeList, cart, onRemove, onMoveRecipe } = props;
  const dispatch = useAppDispatch();

  const [{}, dropRef] = useDrop({
    accept: "PLAN_RECIPE",
    drop: (item: any, monitor) => {
      if (!onMoveRecipe || item?.plannerId === plannerId) return;
      onMoveRecipe(plannerId, item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={dropRef} className={styles.plan}>
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
            plannerId={plannerId}
            isEditMode={onMoveRecipe}
            cart={cart}
            recipe={recipe}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

interface RecipeColorIndicatorInterface {
  recipe: any;
  plannerId: string;
  isEditMode?: boolean;
  cart?: boolean;
  onRemove?: any;
}
const PlanItem = (props: RecipeColorIndicatorInterface) => {
  const { recipe, plannerId, isEditMode, cart, onRemove } = props;
  let { _id, name: recipeName, category, recipeBlendCategory, defaultVersion } = recipe;

  const calorie = Math.round(defaultVersion?.calorie?.value);
  const rxScore = Math.round(defaultVersion?.gigl?.rxScore);
  const ingredients = recipe?.defaultVersion?.ingredients || [];
  category = recipeBlendCategory?.name || category;

  const dispatch = useAppDispatch();
  const addToGrocery = useRecipeToGrocery();

  const style = { backgroundColor: RECIPE_CATEGORY_COLOR[category] };

  const [{ isDragging }, dragRef] = useDrag({
    type: "PLAN_RECIPE",
    item: { plannerId, recipe },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  if (!recipeName) return null;

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isEditMode && isDragging ? "0.5" : "1",
        cursor: isEditMode && isDragging ? "grabbing" : "grab",
      }}
      className={styles.recipe}
    >
      <div className={styles.recipe__containerDiv}>
        <div className={styles.recipe__containerDiv__colorIndicator} style={style} />
        {recipeName}
      </div>
      <div className={styles.recipe__rxScore}>{calorie || 0}</div>
      <div className={styles.recipe__calories}>{rxScore || 0}</div>
      <div className={styles.recipe__calories}>$0</div>
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
        {cart && (
          <IconButton
            size="medium"
            variant="hover"
            fontName={faCartShopping}
            color="primary"
            onClick={() => addToGrocery(_id)}
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
      </div>
    </div>
  );
};
