import React from "react";
// import MealPlanner from "../../../../../theme/meanPlanner/mealPlanner.component";
// import { ingredientCenterList } from "../../../staticDataList/centerTray";
import MealIngredientAndHeader from "./mealIngredientHeader/MealIngredientAndHeader.component";
import styles from "./mealIngredients.module.scss";

const MealIngredients = () => {
  return (
    <div className={styles.mainContainer}>
      {/* <MealPlanner
        headerComponent={<MealIngredientAndHeader type="heading" />}
      >
        {ingredientCenterList?.map(
          ({ ingredientName, servingSize }) => (
            <MealIngredientAndHeader
              key={ingredientName}
              type="ingredient"
              ingredientName={ingredientName}
              servingSize={servingSize}
            />
          )
        )}
      </MealPlanner> */}
    </div>
  );
};

export default MealIngredients;
