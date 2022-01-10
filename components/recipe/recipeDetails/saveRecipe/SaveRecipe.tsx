import React from "react";
import styles from "./SaveRecipe.module.scss";

const SaveRecipe = () => {
  return (
    <div className={styles.saveRecipeModalContainer}>
      <div className={styles.modalBody}>
        <h3>
          Added to My <span>Favorite</span>
        </h3>
        <a href="#">Change</a>
      </div>
    </div>
  );
};

export default SaveRecipe;
