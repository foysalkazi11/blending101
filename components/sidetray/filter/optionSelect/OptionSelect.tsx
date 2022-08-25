import React, { useEffect } from "react";
import { useAppSelector } from "../../../../redux/hooks";
// import { blendTypes } from "../filterRankingList";
import { INGREDIENTS_FILTER } from "../static/recipe";
const { INGREDIENTS_BY_CATEGORY, TYPE, ALLERGIES, DIET, EQUIPMENT, DRUGS } =
  INGREDIENTS_FILTER;
import styles from "./OptionSelect.module.scss";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";

type OptionSelectProps = {
  options?: any[];
  childIngredient?: string;
  values: string[];
  onSelect?: (chip: string) => any;
};

const OptionSelect = ({
  childIngredient = "",
  values = [],
  onSelect = () => {},
}: OptionSelectProps) => {
  const { recipeFilterByIngredientCategory, allIngredients } = useAppSelector(
    (state) => state?.ingredients
  );

  const options = {
    Type: TYPE,
    Diet: DIET,
    Allergies: ALLERGIES,
    Equipment: EQUIPMENT,

    Ingredient:
      childIngredient === "All"
        ? allIngredients?.map((item) => item?.ingredientName)
        : allIngredients
            ?.filter((item) => item?.category === childIngredient)
            ?.map((item) => item?.ingredientName),
  };

  return (
    <div className={styles.optionSelectContainer}>
      <div className={styles.options}>
        {options[recipeFilterByIngredientCategory]?.length
          ? options[recipeFilterByIngredientCategory]?.map((item, index) => {
              const isSelected = values.includes(item);
              return (
                <div
                  className={`${styles.signleItem} ${
                    isSelected ? styles.selected : ""
                  }`}
                  key={index}
                  onClick={() => onSelect(item)}
                >
                  <span>{item}</span>
                  {isSelected && (
                    <div className={styles.tick}>
                      <CheckCircle className={styles.ticked} />
                    </div>
                  )}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default OptionSelect;
