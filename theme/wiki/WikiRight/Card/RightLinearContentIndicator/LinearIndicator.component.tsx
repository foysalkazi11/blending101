import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./LinearIndicator.module.scss";
import { color } from "@mui/system";

interface Percent {
  percent: number;
}

const LinearIndicatorcomponent = ({ percent }: Percent) => {
  let width: string = percent.toString() + "%";
  let backgroundColor = "green";

  console.log(width);

  let style: object = { width };

  // console.log(style);
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
