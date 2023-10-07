import React from "react";
import styles from "./WikiThemeCard.module.scss";
import CheckIcon from "theme/checkIcon/CheckIcon";

interface WikiThemeCardProps {
  image: string;
  title: string;
  onClick?: (data: { [key: string]: any }) => void;
  isCurrentlyActiveTheme?: (id: string) => boolean;
  id?: string;
  data?: { [key: string]: any };
}
const WikiThemeCard = ({
  image = "/images/apple.png",
  isCurrentlyActiveTheme,
  onClick,
  title = "Apple",
  id,
  data = [],
}: WikiThemeCardProps) => {
  const isActiveTheme = isCurrentlyActiveTheme(id);
  return (
    <div className={styles.wikiCardContainer} onClick={() => onClick(data)}>
      <img src={image} alt="theme_img" className={styles.wikiThemeCardImage} />
      <p className={styles.wikiThemeCardTitle}>{title}</p>
      {isActiveTheme && <CheckIcon style={{ position: "absolute", top: "1rem", right: "1rem" }} />}
    </div>
  );
};

export default WikiThemeCard;
