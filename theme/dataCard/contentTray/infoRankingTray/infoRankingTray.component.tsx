import React from "react";
import styles from "./infoRankingTray.module.scss";
import RankingStarTray from "./rankingStarTray/rankingStarTray.component";

interface InfoRankingTrayInterface {
  title: string;
  rankingScore: number;
  commentNumber: number;
  ingredientList?: object[];
}
const InfoRankingTray = ({
  title,
  rankingScore,
  commentNumber,
  ingredientList,
}: InfoRankingTrayInterface) => {
  title = title || "";
  rankingScore = rankingScore || 0;
  commentNumber = commentNumber || 0;
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__title}>{title}</div>
      <div className={styles.mainContainer__rankingTray}>
        <RankingStarTray starNum={rankingScore} commentsNum={commentNumber} />
      </div>
      <div className={styles.mainContainer__ingredientList}>
        {ingredientList &&
          // @ts-ignore
          ingredientList?.map(({ ingredientName }, index) => {
            return index + 1 < ingredientList?.length
              ? `${ingredientName}, `
              : `${ingredientName}.`;
          })}
      </div>
    </div>
  );
};

export default InfoRankingTray;
