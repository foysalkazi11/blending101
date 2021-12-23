import React from "react";
import AContainer from "../../../containers/A.container";
import Filtertray from "../../sidetray/filter/filterTray.component";
import IngredientTrayComponent from "../../sidetray/wiki/ingredient/ingredient.component";
import styles from "./EditRecipe.module.scss";
import Center_header from "./header/centerHeader/Center_header.component";
import Center_Elements from "./recipe_elements/centerElements.component";
import IngredientList from "./recipe_elements/ingredientList/ingredientList&Howto.component";

const EditRecipePage = () => {
  return (
    <AContainer>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.left__title}>Ingredient List</div>
          <div className={styles.left__ingredientlistTray}>
left tray
          </div>
        </div>
        <div className={styles.center}>
          <Center_header />
          <Center_Elements />
          <IngredientList />
        </div>
        <div className={styles.right}>
          <div className={styles.right__title}>Nutrition </div>
        </div>
      </div>
    </AContainer>
  );
};
export default EditRecipePage;
