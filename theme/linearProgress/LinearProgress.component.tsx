import React from "react";
import styles from "./linearProgress.module.scss";
import LinearIndicatorcomponent from "./progress/progress.component";
interface Props {
  name: string;
  percent: number;
  checkbox?: boolean;
}



const Linearcomponent = ({ name, percent, checkbox }: Props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.cardHeadComponent}>
        {checkbox === true ? (
          <span className={styles.container}>
            <input className={styles.checkbox} type="checkbox"/>
            <span className={styles.mark}></span>
          </span>
        ) : (
          ""
        )}
        <div className={styles.title}>{name}</div>
        <div className={styles.score}>{percent}</div>
      </div>
      <LinearIndicatorcomponent percent={percent} />
    </div>
  );
};
export default Linearcomponent;
