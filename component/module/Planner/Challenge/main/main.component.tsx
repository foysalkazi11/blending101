import Image from "next/image";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { faCalendarDay } from "@fortawesome/pro-light-svg-icons";
import { format, isAfter, isToday } from "date-fns";
import CalendarTray from "../../../../../theme/calendar/calendarTray.component";
import Icon from "../../../../atoms/Icon/Icon.component";
import { RECIPE_CATEGORY_COLOR } from "../../../../../data/Recipe";
import { setChallengeDate } from "../../../../../redux/slices/Challenge.slice";
import styles from "./main.module.scss";
import "react-datepicker/dist/react-datepicker.css";

interface MainInterface {
  statistics: any;
  activities: any[];
}

function Main({ activities, statistics }: MainInterface) {
  const profileImage = useAppSelector((state) => state.user.dbUser.image);
  const activeDate = useAppSelector((state) => state.challenge.activeDate);

  return (
    <div className={styles.challenge_circle_main_circle_outer}>
      <div className={styles.challenge_circle_main_circle}>
        <div className={styles.challenge_circle_inside_circle}>
          <div className={styles.wheel__profile}>
            <Image
              src={profileImage || "/images/5.jpeg"}
              alt={""}
              layout={"fill"}
              objectFit={"fill"}
            />
          </div>
          <div className={`${styles.challenge_circle_inside_date} mt-10`}>
            {format(
              activeDate !== "" ? new Date(activeDate) : new Date(),
              "EEEE, MMM dd",
            )}
            <DateSelector
              activeDate={activeDate}
              startDate={statistics?.startDate}
              endDate={statistics?.endDate}
            />
          </div>
          <p className={styles.challenge_circle_day_challenge}>
            {statistics?.challengeName || ""}
          </p>
          <span className={styles.challenge_circle_remaining_day}>
            {statistics?.daysRemaining || 0} Day Remaining
          </span>
          <p className={styles.challenge_circle_remaining_percentage}>
            {parseFloat(statistics?.blendScore || 0).toFixed(1)}%
          </p>
          <p className={styles.challenge_circle_remaining_percentage_paragraph}>
            Blend Score
          </p>
        </div>
        {activities.map((activity, key) => {
          const categories = activity?.posts.map(
            (post) => post?.recipeBlendCategory?.name || "",
          );
          if (key > 30) return <div></div>;
          return (
            <DateButton
              key={activity?._id}
              date={activity?.date}
              categories={categories}
              disabled={activity?.disabled}
              isActive={
                activeDate !== ""
                  ? activity?.date === activeDate
                  : isToday(new Date(activity?.date))
              }
            />
          );
        })}
        <div className={styles.challenge_circle_semi_circle} />
      </div>
    </div>
  );
}

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => (
  <span
    className="ml-10"
    style={{ cursor: "pointer", transform: "translateY(-1.5px)" }}
    onClick={onClick}
    ref={ref}
  >
    <Icon fontName={faCalendarDay} size="2rem" color="#fe5d1f" />
  </span>
));
DatePickerButton.displayName = "DatePickerButton";

interface DateSelectorProps {
  activeDate: string;
  startDate: string;
  endDate: string;
}
const DateSelector = (props: DateSelectorProps) => {
  const dispatch = useAppDispatch();
  const { activeDate, startDate, endDate } = props;

  const dateHandler = (date) => {
    dispatch(setChallengeDate(format(date, "yyyy-MM-dd")));
  };

  return (
    <DatePicker
      selected={activeDate ? new Date(activeDate) : new Date()}
      minDate={new Date(startDate)}
      maxDate={new Date(endDate)}
      onChange={dateHandler}
      customInput={<DatePickerButton />}
    />
  );
};

function DateButton({ date, isActive, categories, disabled }: any) {
  const days = new Date(date);
  const day = format(days, "d");
  const dayName = format(days, "eee");

  const dispatch = useAppDispatch();
  const activateDate = () => {
    dispatch(setChallengeDate(date));
  };

  // Case - 1 - That day is not in the Challenge Range -> Disabled White Circle with border with no text
  if (disabled) {
    return (
      <div
        className={`${styles.wheel__button} ${styles["wheel__button--disabled"]}`}
        style={{
          background: "white",
          border: "1px solid #dddada",
        }}
      />
    );
  } else {
    // Case - 2 - That day is stil not passed -> Disabled White Circle with text and without any border
    if (isAfter(days, new Date())) {
      return (
        <div
          className={`${styles.wheel__button} ${styles["wheel__button--disabled"]}`}
          style={{
            background: "white",
            color: "#333",
          }}
        >
          <p>{day}</p>
          <p>{dayName}</p>
        </div>
      );
    } else {
      // Case - 3 - That day is passed and it didn't had any post -> Disabled grey Circle with text and border
      // Case - 4 - That day is passed and has post -> Colorful circle with text and border
      // Case - 5 - Active Date -> Circle will be highlighted with extra shadow
      const hasPosts = categories.length !== 0;
      return (
        <div
          className={`${styles.wheel__button} ${
            hasPosts ? "" : styles["wheel__button--disabled"]
          }`}
          onClick={hasPosts ? activateDate : null}
          style={{
            background: getBackgroundColor(categories),
            color: "white",
            boxShadow: isActive ? "3px 6px 6px #00000029" : "none",
          }}
        >
          <p>{day}</p>
          <p>{dayName}</p>
        </div>
      );
    }
  }
}

function getBackgroundColor(categories: string[]) {
  const length = categories.length;
  if (length === 0) return "#D8D8D8";
  else if (length === 1) return RECIPE_CATEGORY_COLOR[categories[0]];
  else if (length === 2)
    return `linear-gradient(to left, ${
      RECIPE_CATEGORY_COLOR[categories[0]]
    } 50%, ${RECIPE_CATEGORY_COLOR[categories[1]]} 50%)`;
  else {
    const baseAngle = 360 / length;
    const result = categories.reduce((prev, curr, idx) => {
      return (prev += `${RECIPE_CATEGORY_COLOR[curr]} ${idx * baseAngle}deg, ${
        RECIPE_CATEGORY_COLOR[curr]
      } ${(idx + 1) * baseAngle}deg, `);
    }, "");

    return `conic-gradient(${result.slice(0, -2)})`;
  }
}

export default Main;
