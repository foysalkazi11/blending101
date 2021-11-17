import { style } from "@mui/system";
import React from "react";
import styles from "./Card.module.scss";
import LinearIndicatorcomponent from "./RightLinearContentIndicator/LinearIndicator.component";


interface Props{
    name:string;
    percent:number;
}

const Cardcomponent=({name,percent}:Props)=> {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.cardHeadComponent}>
        <div className={styles.title}>{name}</div>
        <div className={styles.score}>{percent}</div>
      </div>
      <LinearIndicatorcomponent percent={percent} />
    </div>
  );
}

export default Cardcomponent;
