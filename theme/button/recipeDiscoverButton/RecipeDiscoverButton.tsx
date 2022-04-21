/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./RecipeDiscoverButton.module.scss";

type RecipeDiscoverButtonProps = {
  text?: string;
  image?: string;
  handleClick?: () => void;
  Icon?: any;
  disable?: boolean;
  style?: React.CSSProperties;
};

const RecipeDiscoverButton = ({
  handleClick = () => {},
  Icon,
  image = "",
  text = "Recipe",
  disable = false,
  style = {},
}: RecipeDiscoverButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={handleClick}
      style={style}
      disabled={disable ? true : false}
    >
      {image ? <img src={image} alt="icon" className={styles.img} /> : null}
      {Icon ? <Icon className={styles.icon} /> : null}
      {text}
    </button>
  );
};

export default RecipeDiscoverButton;
