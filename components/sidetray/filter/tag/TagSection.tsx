import React from "react";
import CustomAccordion from "../../../../theme/accordion/accordion.component";
import styles from "./TagSection.module.scss";

import { INGREDIENTS_FILTER } from "../static/recipe";
import { useAppDispatch } from "../../../../redux/hooks";
import { setRecipeFilterByIngredientCategory } from "../../../../redux/slices/ingredientsSlice";
const { INGREDIENTS_BY_CATEGORY, TYPE, ALLERGIES, DIET, EQUIPMENT, DRUGS } =
  INGREDIENTS_FILTER;

const nutritionList = [
  "Nutrition Metrics",
  "Macronutrients (Energy)",
  "Micronutrients",
  "Phytonutrients",
];
const recipeList = [
  "Review Rating",
  "Review Count",
  "Source",
  "Author",
  "Publish Date",
];

type TagSectionProps = {
  categories?: { title: string; val: string }[];
};

const TagSection = ({ categories }: TagSectionProps) => {
  const dispatch = useAppDispatch();
  const recipeFilterByCategroy = (categroy: string) => {
    dispatch(setRecipeFilterByIngredientCategory(categroy));
  };
  return (
    <div className={styles.tagSectionContainer}>
      <div
        className={styles.singleItem}
        onClick={() => recipeFilterByCategroy("Type")}
      >
        <h5>Type</h5>
      </div>

      <CustomAccordion title="Ingredient" iconRight={true}>
        {categories?.length
          ? categories?.map((item, index) => {
              return (
                <div className={styles.singleItemInside} key={index}>
                  <h5>{item?.title}</h5>
                </div>
              );
            })
          : null}
      </CustomAccordion>
      <CustomAccordion title="Nutrition" iconRight={true}>
        {nutritionList?.length
          ? nutritionList?.map((item, index) => {
              return (
                <div className={styles.singleItemInside} key={index}>
                  <h5>{item}</h5>
                </div>
              );
            })
          : null}
      </CustomAccordion>
      <div className={styles.singleItem}>
        <h5>Diet</h5>
      </div>
      <div className={styles.singleItem}>
        <h5>Allergies</h5>
      </div>
      <div className={styles.singleItem}>
        <h5>Time</h5>
      </div>
      <div className={styles.singleItem}>
        <h5>Price</h5>
      </div>
      <div className={styles.singleItem}>
        <h5>Equipment</h5>
      </div>
      <CustomAccordion title="Recipe" iconRight={true}>
        {recipeList?.length
          ? recipeList?.map((item, index) => {
              return (
                <div className={styles.singleItemInside} key={index}>
                  <h5>{item}</h5>
                </div>
              );
            })
          : null}
      </CustomAccordion>
      <div className={styles.singleItem}>
        <h5>Collection</h5>
      </div>
      <div className={styles.singleItem}>
        <h5>Teste</h5>
      </div>
      <div className={styles.singleItem}>
        <h5>Dynamic</h5>
      </div>
      <div className={styles.singleItem}>
        <h5>Drugs</h5>
      </div>
    </div>
  );
};

export default TagSection;
