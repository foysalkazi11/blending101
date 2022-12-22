import React from "react";

import styles from "./index.module.scss";

import RecipeCategory from "./_RecipeCategory.component";
import Streakbar from "./_Streakbar.component";
import Dialer from "./_Dialer.component";
import useChallengeLayout from "../../../../hooks/modules/useChallengeLayout";

interface ChallengeProps {
  activities: any[];
  statistics: any;
  progressRef: any;
}

const Challenge: React.FC<ChallengeProps> = (props) => {
  const { activities, statistics, progressRef } = props;
  useChallengeLayout();

  return (
    <div className={styles.mainContainer__contentDiv__innerDiv}>
      <div className={styles.mainContainer__contentDiv__innerDiv__challengeDiv}>
        <div className={styles.challenge_circle_box}>
          <div className={styles.title}>
            <h2>{statistics?.challengeName || ""}</h2>
            <hr />
          </div>
          <RecipeCategory />
          <div ref={progressRef}>
            <Dialer activities={activities} statistics={statistics} />
          </div>
          <Streakbar activities={activities} statistics={statistics} />
        </div>
      </div>
    </div>
  );
};

Challenge.defaultProps = {
  activities: [],
};

export default Challenge;
