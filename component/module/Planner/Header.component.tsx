import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
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
import { faEllipsis, faEllipsisV } from "@fortawesome/pro-regular-svg-icons";

const PlanHeader = () => {
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
    skip: userId === "",
  });

  useEffect(() => {
    if (data?.getPlannerByDates) dispatch(setPlanners(data?.getPlannerByDates));
  }, [data?.getPlannerByDates, dispatch]);

  const startMonth = MONTH[startDate.getMonth()];
  const endMonth = MONTH[endDate.getMonth()];

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

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
