import Image from "next/image";
import React from "react";
import styles from "./customCards.module.scss";

interface CustomCardInterface {
  imageUrl?: string;
  cardTitle?: string;
  cardSummaryText?: string;
}
const CustomCards = ({
  imageUrl,
  cardTitle,
  cardSummaryText,
}: CustomCardInterface) => {
  imageUrl = imageUrl || "/images/5.jpeg";
  cardTitle = cardTitle || "";
  cardSummaryText = cardSummaryText || "";

  if (!cardTitle && !cardSummaryText) return null;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__image}>
        <Image
          src={imageUrl}
          objectFit={"fill"}
          layout={"fill"}
          alt=""
        />
      </div>
      <div className={styles.mainContainer__info}>
        <div className={styles.mainContainer__info__heading}>
          {cardTitle}
        </div>
        <div className={styles.mainContainer__info__content}>
          {cardSummaryText}
        </div>
      </div>
    </div>
  );
};

export default CustomCards;
