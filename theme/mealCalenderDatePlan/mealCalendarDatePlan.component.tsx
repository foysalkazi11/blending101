import React, { useState } from "react";
import styles from "./mealCalendarDatePlan.module.scss";
import RecipeColorIndicator from "./recipeColorIndicator/recipeColorIndicator.component";

interface MealCalendarDatePlanInteface {
  day?: string;
  date?: number;
  indexValue: number;
  setToggleOptionCard?: any;
  toggleOptionCard?: object;
  recipeList?: [];
}

const MealCalendarDatePlan = ({
  day,
  date,
  indexValue,
  setToggleOptionCard,
  toggleOptionCard,
  recipeList,
}: MealCalendarDatePlanInteface) => {
  

  if (!day && !date) return null;
  const handleClick = (
    name: never,
    day: string | undefined,
    date: number | undefined
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
  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.mainContainer__dateDiv}
        style={
          indexValue % 2 == 0 ? { backgroundColor: "#eeeeee" } : {}
        }
      >
        <div className={styles.mainContainer__dateDiv__day}>
          {day}
        </div>
        <div className={styles.mainContainer__dateDiv__date}>
          {date}
        </div>
      </div>
      <div className={styles.mainContainer__recipeDiv}>
        {recipeList?.map(({ color, name }, index) => (
          <RecipeColorIndicator
            key={`${name}`}
            color={color}
            recipeName={name}
            date={date}
            day={day}
            optionToggle={handleClick(name, day, date)}
            toggleOptionCard={toggleOptionCard}
            setToggleOptionCard={setToggleOptionCard}
          />
        ))}
      </div>
    </div>
  );
};

export default MealCalendarDatePlan;
