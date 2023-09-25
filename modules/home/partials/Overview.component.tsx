import React from "react";
import StickyBox from "react-sticky-box";

import RxScore from "component/molecules/Charts/RxScore.component";
import TopIngredients from "component/molecules/Charts/TopIngredients.component";

import BlendTrend from "component/molecules/Charts/BlendTrend.component";
import Calories from "component/molecules/Charts/Calories.component";
import MacroMakeup from "component/molecules/Charts/MacroMakeup.component";

import styles from "./Overview.module.scss";
import { GET_RECENT_CHALLENGES } from "@/challenge/challenge.graphql";
import { useQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { format, subDays } from "date-fns";

const Overview = () => {
  const date = new Date();
  const today = format(date, "yyyy-MM-dd");
  const { id: userId } = useUser();

  const { data } = useQuery(GET_RECENT_CHALLENGES, {
    variables: {
      startDate: format(subDays(date, 6), "yyyy-MM-dd"),
      userId,
    },
  });

  const challengeInfo = data?.getLastSevenDaysChallenge;
  return (
    <StickyBox offsetTop={0} offsetBottom={5}>
      <div className={styles.insights}>
        <div className={styles.insights__body}>
          <BlendTrend today={today} days={challengeInfo?.challenge} />
          <RxScore />
          <TopIngredients ingredients={challengeInfo?.challengeInfo?.topIngredients} />
          <MacroMakeup />
          <Calories />
        </div>
      </div>
    </StickyBox>
  );
};

export default Overview;
