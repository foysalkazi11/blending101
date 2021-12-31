import React from "react";
import styles from "./scoreTray.component.module.scss";

const ScoreTray = () => {
  return (
    <div className={styles.scoreTray}>
      <div className={styles.scoreCards}>
        <div className={styles.scoreCards__left}>
          <h3>45</h3>
          <h5>Net Carbs</h5>
        </div>
        <div className={styles.scoreCards__center}>
          <h3>16</h3>
          <h5>Glycemic Load</h5>
        </div>
        <div className={styles.scoreCards__right}>
          <h3>805</h3>
          <h5>Rx Score</h5>
        </div>
      </div>
    </div>
  );
};

export default ScoreTray;
