import SingleDate from "../single-date/single-date.component";
import Inside from "../inside/inside.component";
import styles from "./main.module.scss";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_CHALLENGE_DETAIL } from "../../../../../graphql/Planner";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setChallenge } from "../../../../../redux/slices/Planner.slice";

interface MainInterface {
  statistics: any;
  activities: any[];
}

function Main({ activities, statistics }: MainInterface) {
  const [getChallengeData, { data }] = useLazyQuery(GET_CHALLENGE_DETAIL, {
    fetchPolicy: "network-only",
  });

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const showChallengeDetails = (date, disabled) => {
    if (disabled) return;
    getChallengeData({
      variables: {
        userId,
        date,
      },
    });
  };

  useEffect(() => {
    // if (!data?.getAllChallengePostByDate) return;
    dispatch(
      setChallenge({
        date: new Date(),
        posts: data?.getAllChallengePostByDate || [],
      }),
    );
  }, [data?.getAllChallengePostByDate, dispatch]);

  return (
    <div className={styles.challenge_circle_main_circle_outer}>
      <div className={styles.challenge_circle_main_circle}>
        <Inside statistics={statistics} />
        {activities &&
          activities.length !== 0 &&
          activities.map((activity, key) => {
            const categories = activity?.posts.map(
              (post) => post?.recipeBlendCategory?.name || "",
            );
            if (key > 30) return <div></div>;
            return (
              <SingleDate
                key={key}
                date={activity?.formattedDate}
                dayName={activity?.dayName}
                day={activity?.date}
                categories={categories}
                disabled={activity?.disabled}
                showChallengeDetails={showChallengeDetails}
              />
            );
          })}
        <div className={styles.challenge_circle_semi_circle} />
      </div>
    </div>
  );
}

export default Main;
