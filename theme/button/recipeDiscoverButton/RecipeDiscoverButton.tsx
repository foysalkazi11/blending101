/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./RecipeDiscoverButton.module.scss";

type RecipeDiscoverButtonProps = {
  text?: string;
  image?: string;
  handleClick?: () => void;
  Icon?: any;
};

const RecipeDiscoverButton = ({
  handleClick = () => {},
  Icon,
  image = "",
  text = "Recipe",
}: RecipeDiscoverButtonProps) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {image ? <img src={image} alt="img" className={styles.img} /> : null}
      {Icon ? <Icon className={styles.icon} /> : null}
      {text}
    </button>
  );
};

export default RecipeDiscoverButton;
