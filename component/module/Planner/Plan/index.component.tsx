import React, { useState } from "react";
import { format } from "date-fns";

import MealCalendarDatePlan from "./_DayPlan.component";

import { useAppSelector } from "../../../../redux/hooks";
import styles from "./index.module.scss";

interface PlanListProps {
  data?: any[];
  showStatic?: boolean;
}
const PlanList = ({ data, showStatic }: PlanListProps) => {
  const [toggleOptionCard, setToggleOptionCard] = useState({});
  return (
    <div className={styles.wrapper}>
      {data?.map((planner, index) => {
        let dayName, day;
        if (planner?.day) {
          dayName = "Day";
          day = planner?.day;
        } else if (planner?.date) {
          const days = new Date(planner?.date);
          dayName = format(days, "E");
          day = format(days, "d");
        }
        return (
          <MealCalendarDatePlan
            key={planner.id}
            plannerId={planner.id}
            indexValue={index}
            day={dayName}
            date={day}
            recipeList={planner?.recipes}
            setToggleOptionCard={setToggleOptionCard}
            toggleOptionCard={toggleOptionCard}
          />
        );
      })}
    </div>
  );
};

export default PlanList;
