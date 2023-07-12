import React from "react";
import styles from "./WikiThemeCard.module.scss";

interface WikiThemeCardProps {
  image: string;
  title: string;
  onClick?: (id: string) => void;
  isCurrentlyActiveTheme?: (id: string) => boolean;
  id?: string;
}
const WikiThemeCard = ({
  image = "/images/apple.png",
  isCurrentlyActiveTheme,
  onClick,
  title = "Apple",
  id,
}: WikiThemeCardProps) => {
  return (
    <div>
      <img src={image} alt="theme_img" className={styles.wikiThemeCardImage} />
      <p className={styles.wikiThemeCardTitle}>{title}</p>
    </div>
  );
};

export default WikiThemeCard;
