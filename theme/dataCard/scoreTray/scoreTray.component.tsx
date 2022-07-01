import React from "react";
import styles from "./scoreTray.module.scss";

interface ScoreTrayInterface {
  category?: string;
  nutriScore?: number;
  calorieValue?: number;
}
const ScoreTray = ({
  category,
  nutriScore,
  calorieValue,
}: ScoreTrayInterface) => {
  category = category || "";
  nutriScore = nutriScore || 0;
  calorieValue = calorieValue || 0;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__categories}>
        {category}
      </div>
      <div className={styles.mainContainer__score}>
        <div className={styles.mainContainer__score__type}>
          Nutri-Score
        </div>
        <div className={styles.mainContainer__score__value}>
          {nutriScore}
        </div>
      </div>
      <div className={styles.mainContainer__score}>
        <div className={styles.mainContainer__score__type}>
          Calories
        </div>
        <div className={styles.mainContainer__score__value}>
          {calorieValue}
        </div>
      </div>
    </div>
  );
};

export default ScoreTray;
