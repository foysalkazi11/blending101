import React, { useEffect, useState } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  getDate,
} from "date-fns";
import MealCalendarDatePlan from "./Plan.component";

import styles from "./RecipePlanner.module.scss";
import Icon from "../../../atoms/Icon/Icon.component";

import { MdRemoveCircleOutline } from "react-icons/md";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { MONTH } from "../../../../data/Date";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CLEAR_PLANNER,
  GET_PLANNER_BY_WEEK,
} from "../../../../graphql/Planner";
import {
  clearAllPlanner,
  gotoNextWeek,
  gotoPreviousWeek,
  setPlanners,
} from "../../../../redux/slices/Planner.slice";
import Publish from "../../../../helpers/Publish";

const RecipePlanner = () => {
  const [toggleOptionCard, setToggleOptionCard] = useState({});
  const planners = useAppSelector((state) => state.planner.planners);
  return (
    <div>
      <div className={styles.header}>
        <RecipeMealHeader />
      </div>
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

const RecipeMealHeader = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { startDate, endDate } = useAppSelector(
    (state) => state.planner.planner,
  );

  const { data } = useQuery(GET_PLANNER_BY_WEEK, {
    variables: {
      userId,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    },
    fetchPolicy: "network-only",
  });
  const [clearPlanner, clearState] = useMutation(CLEAR_PLANNER);

  useEffect(() => {
    if (data?.getPlannerByDates) dispatch(setPlanners(data?.getPlannerByDates));
  }, [data?.getPlannerByDates, dispatch]);

  const startMonth = MONTH[startDate.getMonth()];
  const endMonth = MONTH[endDate.getMonth()];

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const clearAllHandler = async () => {
    await Publish({
      mutate: clearPlanner,
      variables: {
        userId,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      },
      state: clearState,
      success: `Deleted Planner sucessfully`,
      onSuccess: () => {
        dispatch(clearAllPlanner());
      },
    });
  };
  return (
    <div className={styles.header__wrapper}>
      <div className={styles.textArrowTray}>
        <div className={styles.button} onClick={clearAllHandler}>
          <MdRemoveCircleOutline />
          <div className={styles.button__text}>Clear All</div>
        </div>
        <AiOutlineLeft
          className={styles.textArrowTray__icon}
          onClick={() => dispatch(gotoPreviousWeek())}
        />
        <h4 className={styles.textArrowTray__text}>
          Meal Plan, {`${startMonth} ${startDay} - ${endMonth} ${endDay}`}
        </h4>
        <AiOutlineRight
          className={styles.textArrowTray__icon}
          onClick={() => dispatch(gotoNextWeek())}
        />
        <div className={styles.button}>
          <Icon fontName={faArrowsRotate} size="15px" />
          <div className={styles.button__text}>Generate</div>
        </div>
      </div>
    </div>
  );
};

export { RecipePlanner };
