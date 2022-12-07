import React, { Fragment, useState } from "react";
import { format } from "date-fns";

import MealCalendarDatePlan from "./_DayPlan.component";

import { useAppSelector } from "../../../../redux/hooks";

interface PlanListProps {
  data?: any[];
  showStatic?: boolean;
}
const PlanList = ({ data, showStatic }: PlanListProps) => {
  const [toggleOptionCard, setToggleOptionCard] = useState({});
  const planners = useAppSelector((state) => state.planner.planners);
  return (
    <Fragment>
      {showStatic
        ? data?.map((planner, index) => {
            const { formatedDate: date, recipes } = planner;
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
          })
        : planners?.map((planner, index) => {
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
    </Fragment>
  );
};

export default PlanList;
