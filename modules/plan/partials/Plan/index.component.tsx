import React, { useState } from "react";
import { format } from "date-fns";

import MealCalendarDatePlan from "./_DayPlan.component";

import styles from "./index.module.scss";
import { UTCDate } from "../../../../helpers/Date";
import { MyPlanItem } from "@/app/types/plan.types";

interface PlanListProps {
  data?: MyPlanItem[];
  week?: any;
  isWeekFromURL?: boolean;
}
const PlanList = ({ data, week, isWeekFromURL }: PlanListProps) => {
  const [toggleOptionCard, setToggleOptionCard] = useState({});
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <span></span>
        <span>Calorie</span>
        <span>Rx Facts</span>
        <span>Price</span>
      </div>

      {data?.map((planner, index) => {
        let dayName, day;
        if (planner?.day !== undefined) {
          dayName = "Day";
          day = index + 1;
        } else if (planner?.formatedDate) {
          const days = UTCDate(planner?.formatedDate);
          dayName = format(days, "eee") || "UND";
          day = format(days, "d") || "0";
        }
        return (
          <MealCalendarDatePlan
            key={planner._id}
            plannerId={planner._id}
            indexValue={index}
            day={dayName}
            date={day}
            week={week}
            recipeList={planner.recipes}
            isWeekFromURL={isWeekFromURL}
            setToggleOptionCard={setToggleOptionCard}
            toggleOptionCard={toggleOptionCard}
          />
        );
      })}
    </div>
  );
};

export default PlanList;
