import styles from "./single-date.module.scss";
import { food_color } from "../js/my";
import { RECIPE_CATEGORY_COLOR } from "../../../data/Recipe";
import { useLazyQuery } from "@apollo/client";
import { GET_CHALLENGE_DETAIL } from "../../../graphql/Planner";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import { setChallenge } from "../../../redux/slices/Planner.slice";

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

function SingleDate({ date, categories }: any) {
  const days = new Date(date);
  const dayName = format(days, "E");
  const day = format(days, "d");
  const selectToday = false;
  const [getChallengeData, { loading, data }] =
    useLazyQuery(GET_CHALLENGE_DETAIL);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const showChallengeDetails = () => {
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
        background: getBackgroundColor(categories),
        color: categories.length === 0 ? "#333" : "white",
        boxShadow: selectToday ? "3px 6px 6px #00000029" : "none",
        border: selectToday ? "1px solid #9C9C9C" : "none",
      }}
    >
      <p>{day}</p>
      <p>{dayName}</p>
    </div>
  );
}

export default SingleDate;
