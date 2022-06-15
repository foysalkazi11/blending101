import React from "react";
import styles from "./SaveRecipe.module.scss";

type SaveRecipeProps = {
  title?: string;
  handleChange?: () => void;
};

const SaveRecipe = ({
  title = "Favorite",
  handleChange = () => {},
}: SaveRecipeProps) => {
  return (
    <div className={styles.saveRecipeModalContainer}>
      <div className={styles.modalBody}>
        <h3>
          Added to <span> {title}</span> collection
        </h3>
        <a onClick={handleChange}>Change</a>
      </div>
    </div>
  );
};

export default SaveRecipe;
