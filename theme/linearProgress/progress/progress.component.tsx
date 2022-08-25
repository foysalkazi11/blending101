import React from "react";
import styles from "./progress.module.scss";

interface Percent {
  percent: number;
  highestValue: number;
}

const LinearIndicatorcomponent = ({ percent, highestValue }: Percent) => {
  let width: number = (percent / highestValue) * 100;

  return (
    <div className={styles.LinearIndicatorDiv}>
      {/* <LinearProgress variant="determinate" value={20} sx={color="green"} /> */}
      <div
        className={styles.progressBar}
        style={{ width: `${width}%` }}
        role="progressbar"
      ></div>
    </div>
  );
};

export default LinearIndicatorcomponent;
