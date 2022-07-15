import Image from "next/image";
import React from "react";
import InfoRankingTray from "./contentTray/infoRankingTray/infoRankingTray.component";
import ScoreTray from "./scoreTray/scoreTray.component";
import { RiCalendarEventLine } from "react-icons/ri";
import styles from "./viewDataCard.module.scss";
import CalendarTray from "../calendar/calendarTray.component";

interface ViewDataCardInterface {
  title?: string;
  cardImage?: string;
  companyLogo?: string;
  companyName?: string;
  category?: string;
  nutriScore?: number;
  calorieValue?: number;
  rankingScore?: number;
  commentNumber?: number;
  ingredientList?: string[];
  showCalender?: boolean;
  activeCalenderBoolean?: boolean;
}
const ViewDataCard = ({
  title,
  cardImage,
  companyLogo,
  companyName,
  category,
  nutriScore,
  calorieValue,
  rankingScore,
  commentNumber,
  ingredientList,
  showCalender,
  activeCalenderBoolean,
}: ViewDataCardInterface) => {
  title = title || "Title Name";
  cardImage = cardImage || "/images/5.jpeg";
  companyLogo = companyLogo || "/images/5.jpeg";
  companyName = companyName || "";
  category = category || "";
  nutriScore = nutriScore || 0;
  calorieValue = calorieValue || 0;
  rankingScore = rankingScore || 0;
  commentNumber = commentNumber || 0;
  showCalender = showCalender || false;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__imgRankingTray}>
        <div className={styles.mainContainer__imgRankingTray__imageDiv}>
          <Image src={cardImage} alt="" objectFit="cover" layout="fill" />
        </div>
        <div className={styles.mainContainer__imgRankingTray__content}>
          <InfoRankingTray
            title={title}
            ingredientList={ingredientList}
            rankingScore={rankingScore}
            commentNumber={commentNumber}
          />
        </div>
      </div>
      <div className={styles.mainContainer__elemTray}>
        <ScoreTray
          category={category}
          nutriScore={nutriScore}
          calorieValue={calorieValue}
        />
      </div>
    </div>
  );
};

export default ViewDataCard;
