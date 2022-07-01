import React from "react";
import StyledCheckbox from "../../../../../../../theme/styledCheckbox/styledCheckbox.component";
import styles from "./MealIngredientAndHeader.module.scss";

interface MealIngredientAndHeaderInterface {
  ingredientName?: string;
  servingSize?: string;
  handleClickFunc?: any;
  type: "ingredient" | "heading";
}
const MealIngredientAndHeader = ({
  handleClickFunc,
  ingredientName,
  servingSize,
  type,
}: MealIngredientAndHeaderInterface) => {
  const activeClassName =
    type === "heading"
      ? styles.mainContainer__text
      : styles.mainContainer__ingredientText;
  ingredientName = type === "heading" ? "Ingredient" : ingredientName;
  servingSize = type === "heading" ? "Serving Size" : servingSize;

  const style = type === "heading" ? {} : { marginBottom: "15px" };
  return (
    <div className={styles.mainContainer} style={style}>
      <StyledCheckbox onClickFunc={handleClickFunc} />
      <div className={activeClassName}>
        <span>{ingredientName}</span>
        <span>{servingSize}</span>
      </div>
    </div>
  );
};

export default MealIngredientAndHeader;
