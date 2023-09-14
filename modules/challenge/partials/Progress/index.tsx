import React from "react";

import styles from "./index.module.scss";

import RecipeCategory from "./_category.component";
import Streakbar from "./_streak.component";
import Dialer from "./_dial.component";
import useChallengeLayout from "@/challenge/hooks/useLayout";

interface ChallengeProps {
  elementRef: any;
  progressRef: any;
  canUpload: boolean;
  activities: any[];
  statistics: any;
}

const Challenge: React.FC<ChallengeProps> = (props) => {
  const { canUpload, activities, statistics, elementRef, progressRef } = props;
  useChallengeLayout();

  return (
    <div ref={elementRef} className={styles.mainContainer__contentDiv__innerDiv}>
      <div className={styles.mainContainer__contentDiv__innerDiv__challengeDiv}>
        <div className={styles.challenge_circle_box}>
          <div className={styles.title}>
            <h2>{statistics?.challengeName || ""}</h2>
            <hr />
          </div>
          <RecipeCategory />
          <div ref={progressRef}>
            <Dialer canUpload={canUpload} activities={activities} statistics={statistics} />
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
