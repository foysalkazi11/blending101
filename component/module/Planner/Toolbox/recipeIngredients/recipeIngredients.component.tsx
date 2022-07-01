import React from "react";
// import SharedHeader from "../sharedHeader/sharedHeader.component";
import CombinedButtonTray from "./mealIngredientsTray/combinedButtonTray/combinedButtonTray.component";
import MealIngredients from "./mealIngredientsTray/mealIngredients.component";
import styles from "./recipeIngredients.module.scss";

const RecipeIngredients = () => {
  return (
    <div className={styles.mainContainer}>
      {/* <SharedHeader
        title="Ingredients"
        optionTray={<CombinedButtonTray />}
      /> */}

      <MealIngredients />
    </div>
  );
};

export default RecipeIngredients;
