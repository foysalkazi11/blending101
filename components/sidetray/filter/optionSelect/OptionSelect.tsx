import React from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { blendTypes } from "../filterRankingList";
import { INGREDIENTS_FILTER } from "../static/recipe";
const { INGREDIENTS_BY_CATEGORY, TYPE, ALLERGIES, DIET, EQUIPMENT, DRUGS } =
  INGREDIENTS_FILTER;
import styles from "./OptionSelect.module.scss";

type OptionSelectProps = {
  options?: any[];
};

const options = {
  Type: TYPE,
  Diet: DIET,
  Allergies: ALLERGIES,
  Equipment: EQUIPMENT,
  Drugs: DRUGS,
};

const OptionSelect = () => {
  const { recipeFilterByIngredientCategory } = useAppSelector(
    (state) => state?.ingredients
  );

  return (
    <div className={styles.optionSelectContainer}>
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
  );
};

export default OptionSelect;
