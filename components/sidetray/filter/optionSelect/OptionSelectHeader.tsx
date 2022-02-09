import React from "react";
import { BsArrowRepeat, BsChevronLeft } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setRecipeFilterByIngredientCategory } from "../../../../redux/slices/ingredientsSlice";
import styles from "./OptionSelect.module.scss";

const OptionSelectHeader = () => {
  const dispatch = useAppDispatch();
  const { recipeFilterByIngredientCategory } = useAppSelector(
    (state) => state.ingredients
  );
  return (
    <div className={styles.optionSelectHeaderContainer}>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <div
            className={styles.icon}
            onClick={() => dispatch(setRecipeFilterByIngredientCategory(""))}
          >
            <BsChevronLeft />
          </div>
          <h3>{recipeFilterByIngredientCategory}</h3>
        </div>
        <BsArrowRepeat />
      </div>
    </div>
  );
};

export default OptionSelectHeader;
