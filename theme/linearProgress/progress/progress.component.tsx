import React from "react";
import styles from "./progress.module.scss";

interface Percent {
  percent: number;
}

const LinearIndicatorcomponent = ({ percent }: Percent) => {
  let width: string = percent.toString() + "%";

  let style: object = { width };

  return (
    <div className={styles.LinearIndicatorDiv}>
      {/* <LinearProgress variant="determinate" value={20} sx={color="green"} /> */}
      <div className={styles.progressBar} style={style} role="progressbar">
        .
      </div>
    </div>
  );
};

export default LinearIndicatorcomponent;
