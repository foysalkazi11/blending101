import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-light-svg-icons";
import { format } from "date-fns";

import { MONTH } from "../../../../data/Date";
import {
  GET_PLANNER_BY_WEEK,
  CLEAR_PLANNER,
} from "../../../../graphql/Planner";
import Publish from "../../../../helpers/Publish";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setPlanners,
  clearAllPlanner,
  gotoPreviousWeek,
  gotoNextWeek,
} from "../../../../redux/slices/Planner.slice";
import IconButton from "../../../atoms/Button/IconButton.component";
import Icon from "../../../atoms/Icon/Icon.component";

import styles from "./_Header.module.scss";

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
      </div>
    </div>
  );
};

export default PlanHeader;
