import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  deleteRecipe,
  duplicateRecipe,
  IPlannerRecipe,
  moveRecipe,
} from "../../redux/slices/Planner.slice";
import styles from "./mealCalendarDatePlan.module.scss";
import RecipeColorIndicator from "./recipeColorIndicator/recipeColorIndicator.component";

interface MealCalendarDatePlanInteface {
  plannerId?: string;
  day?: string;
  date?: string;
  indexValue: number;
  setToggleOptionCard?: any;
  toggleOptionCard?: object;
  recipeList?: IPlannerRecipe[];
}

const MealCalendarDatePlan = ({
  plannerId,
  day,
  date,
  indexValue,
  setToggleOptionCard,
  toggleOptionCard,
  recipeList,
}: MealCalendarDatePlanInteface) => {
  const dispatch = useAppDispatch();

  if (!day && !date) return null;
  const handleClick = (
    name: string,
    day: string | undefined,
    date: string | undefined,
  ) => {
    let toggleState = false;
    if (
      // @ts-ignore
      date === toggleOptionCard?.date &&
      // @ts-ignore
      day === toggleOptionCard?.day &&
      // @ts-ignore
      name === toggleOptionCard?.recipe
    ) {
      toggleState = true;
    }

    return toggleState;
  };

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
    <div className={styles.mainContainer}>
      <div
        className={styles.mainContainer__dateDiv}
        style={indexValue % 2 == 0 ? { backgroundColor: "#eeeeee" } : {}}
      >
        <div className={styles.mainContainer__dateDiv__day}>{day}</div>
        <div className={styles.mainContainer__dateDiv__date}>{date}</div>
      </div>
      <div className={styles.mainContainer__recipeDiv}>
        {recipeList?.map((recipe) => (
          <RecipeColorIndicator
            key={recipe?._id}
            recipe={recipe}
            date={date}
            day={day}
            optionToggle={handleClick(recipe?.name, day, date)}
            toggleOptionCard={toggleOptionCard}
            setToggleOptionCard={setToggleOptionCard}
            onDelete={deleteHandler}
            onCopy={copyHandler}
            onMove={moveHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default MealCalendarDatePlan;
