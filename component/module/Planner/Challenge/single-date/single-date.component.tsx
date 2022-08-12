import styles from "./single-date.module.scss";
import { useLazyQuery } from "@apollo/client";
import { isAfter, isToday } from "date-fns";
import { useEffect } from "react";
import { RECIPE_CATEGORY_COLOR } from "../../../../../data/Recipe";
import { GET_CHALLENGE_DETAIL } from "../../../../../graphql/Planner";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setChallenge } from "../../../../../redux/slices/Planner.slice";

function getBackgroundColor(categories: string[], selectToday: boolean) {
  const length = categories.length;
  if (length === 0) return selectToday ? "#fff" : "#D8D8D8";
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

function SingleDate({ date, day, dayName, categories, disabled }: any) {
  const days = new Date(date);
  const selectToday = isToday(days);

  const [getChallengeData, { data }] = useLazyQuery(GET_CHALLENGE_DETAIL, {
    fetchPolicy: "no-cache",
  });

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const showChallengeDetails = () => {
    if (disabled) return;
    getChallengeData({
      variables: {
        userId,
        date,
      },
    });
  };

  useEffect(() => {
    if (!data?.getAllChallengePostByDate) return;
    dispatch(
      setChallenge({ date: date, posts: data.getAllChallengePostByDate }),
    );
  }, [data?.getAllChallengePostByDate, date, dispatch]);

  return (
    <div
      className={styles.challenge_circle_single_date}
      onClick={showChallengeDetails}
      style={{
        background:
          !isAfter(days, new Date()) && disabled === null
            ? getBackgroundColor(categories, selectToday)
            : "#fff",
        color: selectToday || isAfter(days, new Date()) ? "#333" : "white",
        boxShadow: selectToday ? "3px 6px 6px #00000029" : "none",
        border: disabled !== null || selectToday ? "1px solid #dddada" : "none",
      }}
    >
      {(disabled === null || selectToday) && (
        <>
          <p>{day}</p>
          <p>{dayName}</p>
        </>
      )}
    </div>
  );
}

export default SingleDate;
