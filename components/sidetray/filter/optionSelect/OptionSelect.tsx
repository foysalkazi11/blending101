import React, { useEffect } from "react";
import { useAppSelector } from "../../../../redux/hooks";
// import { blendTypes } from "../filterRankingList";
import { INGREDIENTS_FILTER } from "../static/recipe";
const { INGREDIENTS_BY_CATEGORY, TYPE, ALLERGIES, DIET, EQUIPMENT, DRUGS } =
  INGREDIENTS_FILTER;
import styles from "./OptionSelect.module.scss";

type OptionSelectProps = {
  options?: any[];
  childIngredient?: string;
};

const OptionSelect = ({ childIngredient = "" }: OptionSelectProps) => {
  const { recipeFilterByIngredientCategory, allIngredients } = useAppSelector(
    (state) => state?.ingredients
  );

  const options = {
    Type: TYPE,
    Diet: DIET,
    Allergies: ALLERGIES,
    Equipment: EQUIPMENT,
    Drugs: DRUGS,
    Ingredient:
      childIngredient === "All"
        ? allIngredients?.map((item) => item?.ingredientName)
        : allIngredients
            ?.filter((item) => item?.category === childIngredient)
            ?.map((item) => item?.ingredientName),
  };

  return (
    <div className={styles.optionSelectContainer}>
      <input placeholder="Search" />
      <div className={styles.options}>
        {options[recipeFilterByIngredientCategory]?.length
          ? options[recipeFilterByIngredientCategory]?.map((item, index) => {
              return (
                <div className={styles.signleItem} key={index}>
                  <span>{item}</span>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default OptionSelect;
