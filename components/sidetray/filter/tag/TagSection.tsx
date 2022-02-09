import React from "react";
import CustomAccordion from "../../../../theme/accordion/accordion.component";
import styles from "./TagSection.module.scss";
import { blendTypes } from "../filterRankingList";
import { INGREDIENTS_FILTER } from "../static/recipe";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setRecipeFilterByIngredientCategory } from "../../../../redux/slices/ingredientsSlice";
import OptionSelect from "../optionSelect/OptionSelect";
import OptionSelectHeader from "../optionSelect/OptionSelectHeader";
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
  const { recipeFilterByIngredientCategory } = useAppSelector(
    (state) => state?.ingredients
  );
  const recipeFilterByCategroy = (categroy: string) => {
    dispatch(setRecipeFilterByIngredientCategory(categroy));
  };
  return (
    <div className={styles.tagSectionContainer}>
      {recipeFilterByIngredientCategory ? (
        <>
          <OptionSelectHeader />
          <OptionSelect />
        </>
      ) : (
        <>
          <input placeholder="Search" />
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
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Diet")}
          >
            <h5>Diet</h5>
          </div>
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Allergies")}
          >
            <h5>Allergies</h5>
          </div>
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Time")}
          >
            <h5>Time</h5>
          </div>
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Price")}
          >
            <h5>Price</h5>
          </div>
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Equipment")}
          >
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
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Collection")}
          >
            <h5>Collection</h5>
          </div>
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Teste")}
          >
            <h5>Teste</h5>
          </div>
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Dynamic")}
          >
            <h5>Dynamic</h5>
          </div>
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Drugs")}
          >
            <h5>Drugs</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default TagSection;
