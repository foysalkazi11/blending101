import { format, isAfter, isToday } from "date-fns";
import React from "react";
import { getBackgroundColor } from "../../../modules/challenge/partials/Progress/_dial.component";

import styles from "./_Charts.module.scss";
import { ChallengeDay } from "@/app/types/challenge.types";

function DateButton({ date, categories, disabled }: any) {
  const days = new Date(date);
  const day = format(days, "d");
  const dayName = format(days, "MMM");

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
          className={`${styles.wheel__button} ${hasPosts ? "" : styles["wheel__button--disabled"]}`}
          style={{
            background: getBackgroundColor(categories),
            color: "white",
          }}
        >
          <p>{day}</p>
          <p>{dayName}</p>
        </div>
      );
    }
  }
}

interface BlendTrend {
  today: string;
  days: ChallengeDay[];
}

const BlendTrend = (props: BlendTrend) => {
  const { today, days } = props;
  return (
    <div className="mb-50">
      <div className={styles.insights__graph}>
        <h3>Blending Trend</h3>
        <div className={styles.wheel}>
          {days?.map((activity, key) => {
            const categories = activity?.posts.map((post) => post?.recipeBlendCategory?.name || "");
            return (
              <DateButton
                key={activity?._id}
                date={activity?.date}
                categories={categories}
                disabled={activity?.disabled}
                isActive={today !== "" ? activity?.date === today : isToday(new Date(activity?.date))}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlendTrend;
