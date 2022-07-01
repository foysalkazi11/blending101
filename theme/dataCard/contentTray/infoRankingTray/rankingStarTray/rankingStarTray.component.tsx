import React from "react";
import { AiFillStar } from "react-icons/ai";
import styles from "./rankingStarTray.module.scss";

interface RankingStarTrayInterface {
  starNum: number;
  commentsNum: number;
  totalStarNum?: number;
}
const RankingStarTray = ({
  starNum,
  commentsNum,
  totalStarNum
}: RankingStarTrayInterface) => {
  starNum = starNum || 0;
  commentsNum = commentsNum || 0;
  totalStarNum = totalStarNum || 5;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__score}>
        {starNum.toPrecision(2)}
      </div>
      <div className={styles.mainContainer__starTray}>
        {[...Array(totalStarNum)].map((elem, index) => (
          <AiFillStar
            key={Math.random()}
            className={styles.mainContainer__starTray__star}
          />
        ))}
      </div>
      <div className={styles.mainContainer__comments}>
        ({commentsNum})
      </div>
    </div>
  );
};

export default RankingStarTray;
