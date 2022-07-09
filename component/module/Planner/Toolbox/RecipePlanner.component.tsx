import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import MealCalendarDatePlan from "./Plan.component";

import styles from "./RecipePlanner.module.scss";
import Icon from "../../../atoms/Icon/Icon.component";

import { MdRemoveCircleOutline } from "react-icons/md";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { MONTH } from "../../../../data/Date";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PLANNER_BY_WEEK } from "../../../../graphql/Planner";
import { setPlanners } from "../../../../redux/slices/Planner.slice";

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
              key={date}
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
  const today = useMemo(() => new Date(), []);
  const [first, setFirst] = useState(today.getDate() - today.getDay() + 1);

  var firstday = useMemo(() => new Date(today.setDate(first)), [first, today]);
  var lastday = useMemo(
    () => new Date(today.setDate(today.getDate() + 6)),
    [today],
  );

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { loading, data } = useQuery(GET_PLANNER_BY_WEEK, {
    variables: {
      userId,
      startDate: firstday.toISOString(),
      endDate: lastday.toISOString(),
    },
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data?.getPlannerByDates) dispatch(setPlanners(data?.getPlannerByDates));
  }, [data?.getPlannerByDates, dispatch]);

  const startMonth = MONTH[firstday.getMonth()];
  const endMonth = MONTH[lastday.getMonth()];

  const startDate = firstday.getDate();
  const endDate = lastday.getDate();

  const goToPreviousWeek = () => {
    setFirst(first - 7);
  };
  const goToNextWeek = () => {
    setFirst(first + 7);
  };

  return (
    <div className={styles.header__wrapper}>
      <div className={styles.textArrowTray}>
        <div className={styles.button}>
          <MdRemoveCircleOutline />
          <div className={styles.button__text}>Clear All</div>
        </div>
        <AiOutlineLeft
          className={styles.textArrowTray__icon}
          onClick={goToPreviousWeek}
        />
        <h4 className={styles.textArrowTray__text}>
          Meal Plan, {`${startMonth} ${startDate} - ${endMonth} ${endDate}`}
        </h4>
        <AiOutlineRight
          className={styles.textArrowTray__icon}
          onClick={goToNextWeek}
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
