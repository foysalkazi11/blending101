import React, { useState } from "react";
import { format } from "date-fns";

import PlannerHeader from "./_Header.component";
import MealCalendarDatePlan from "./_DayPlan.component";

import { useAppSelector } from "../../../../redux/hooks";

import styles from "./index.module.scss";

const PlanList = () => {
  const [toggleOptionCard, setToggleOptionCard] = useState({});
  const planners = useAppSelector((state) => state.planner.planners);
  return (
    <div>
      <PlannerHeader />
      <div>
        <div className={styles.headings}>
          <li className={styles.headings__center}>Days</li>
          <li className={styles.headings__recipe}>Recipe</li>
          <li className={styles.headings__center}>Rx Score</li>
          <li className={styles.headings__center}>Calories</li>
          <li className={styles.headings__center}></li>
        </div>
        {planners?.map((planner, index) => {
          const { date, recipes } = planner;
          const days = new Date(date);
          const dayName = format(days, "E");
          const day = format(days, "d");
          return (
            <MealCalendarDatePlan
              key={planner.id}
              plannerId={planner.id}
              indexValue={index}
              day={dayName}
              date={day}
              recipeList={recipes}
              setToggleOptionCard={setToggleOptionCard}
              toggleOptionCard={toggleOptionCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlanList;
