import React, { useEffect } from "react";

import styles from "./Challenge.module.scss";

import Food from "./food/food.component";
import GraphDetailContainer from "./graph-detail-container/graph-detail-container.component";
import Main from "./main/main.component";
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
          <Food />
          <Main activities={activities} statistics={statistics} />
          <GraphDetailContainer
            activities={activities}
            statistics={statistics}
          />
        </div>
      </div>
    </div>
  );
};

Challenge.defaultProps = {
  activities: [],
};

export default Challenge;
