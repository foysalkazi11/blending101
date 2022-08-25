import React from "react";
import { BsArrowRepeat, BsChevronLeft } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { resetFilterValue } from "../../../../redux/slices/filterRecipeSlice";
import { setRecipeFilterByIngredientCategory } from "../../../../redux/slices/ingredientsSlice";
import styles from "./OptionSelect.module.scss";

type OptionSelectHeaderProps = {
  pageTitle?: string;
};

const OptionSelectHeader = ({ pageTitle }: OptionSelectHeaderProps) => {
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
          <h3>{pageTitle}</h3>
        </div>
        <div
          className={styles.rightSide}
          onClick={() => dispatch(resetFilterValue({ pageTitle }))}
        >
          <BsArrowRepeat />
        </div>
      </div>
      <input className={styles.optionSelectInput} placeholder="Search" />
    </div>
  );
};

export default OptionSelectHeader;
