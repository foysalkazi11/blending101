import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/pro-regular-svg-icons";
import { format } from "date-fns";

import { MONTH } from "../../../data/Date";
import { GET_PLANNER_BY_WEEK } from "../../../graphql/Planner";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setPlanners,
  gotoPreviousWeek,
  gotoNextWeek,
} from "../../../redux/slices/Planner.slice";
import IconButton from "../../atoms/Button/IconButton.component";

import styles from "./Header.module.scss";

const PlanHeader = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { start, end } = useAppSelector((state) => state.planner);

  const { data } = useQuery(GET_PLANNER_BY_WEEK, {
    variables: {
      userId,
      startDate: format(start, "yyyy-MM-dd"),
      endDate: format(end, "yyyy-MM-dd"),
    },
    skip: userId === "",
  });

  useEffect(() => {
    if (data?.getPlannerByDates) dispatch(setPlanners(data?.getPlannerByDates));
  }, [data?.getPlannerByDates, dispatch]);

  const startMonth = MONTH[start.getMonth()];
  const endMonth = MONTH[end.getMonth()];

  const startDay = start.getDate();
  const endDay = end.getDate();

  return (
    <div className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.textArrowTray}>
          <IconButton
            size="small"
            fontName={faChevronLeft}
            onClick={() => dispatch(gotoPreviousWeek())}
          />
          <h4 className={styles.textArrowTray__text}>
            Meal Plan, {`${startMonth} ${startDay} - ${endMonth} ${endDay}`}
          </h4>
          <IconButton
            size="small"
            fontName={faChevronRight}
            onClick={() => dispatch(gotoNextWeek())}
          />
        </div>
        <IconButton
          size="medium"
          fontName={faEllipsisV}
          className={styles.header__menu}
        />
      </div>
    </div>
  );
};

export default PlanHeader;
