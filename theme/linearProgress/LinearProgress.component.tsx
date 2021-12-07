import React from "react";
import styles from "./linearProgress.module.scss";
import LinearIndicatorcomponent from "./progress/progress.component";


interface Props{
    name:string;
    percent:number;
}

const Linearcomponent=({name,percent}:Props)=> {
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

export default Linearcomponent;
