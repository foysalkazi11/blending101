import React from "react";

import styles from "./index.module.scss";

import RecipeCategory from "./_RecipeCategory.component";
import Streakbar from "./_Streakbar.component";
import Dialer from "./_Dialer.component";
import useChallengeLayout from "../../../../hooks/modules/useChallengeLayout";

interface ChallengeProps {
  activities: any[];
  statistics: any;
}

const Challenge: React.FC<ChallengeProps> = (props) => {
  const { activities, statistics } = props;
  useChallengeLayout();

  return (
    <div className={styles.mainContainer__contentDiv__innerDiv}>
      <div className={styles.mainContainer__contentDiv__innerDiv__challengeDiv}>
        <div className={styles.challenge_circle_box}>
          <RecipeCategory />
          <Dialer activities={activities} statistics={statistics} />
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
