import React, { useState } from "react";
import CustomAccordion from "../../../../theme/accordion/accordion.component";
import styles from "./TagSection.module.scss";
import { blendTypes } from "../filterRankingList";
import { INGREDIENTS_FILTER } from "../static/recipe";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setRecipeFilterByIngredientCategory } from "../../../../redux/slices/ingredientsSlice";
import OptionSelect from "../optionSelect/OptionSelect";
import OptionSelectHeader from "../optionSelect/OptionSelectHeader";
import NumericFilter from "../numericFilter/NumericFilter";
import CheckboxOptions from "../checkboxOptions/CheckboxOptions";
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
  const [childIngredient, setChailIngredient] = useState("");
  const dispatch = useAppDispatch();
  const { recipeFilterByIngredientCategory } = useAppSelector(
    (state) => state?.ingredients
  );
  const recipeFilterByCategroy = (categroy: string, child?: string) => {
    child = child || "";
    dispatch(setRecipeFilterByIngredientCategory(categroy));
    setChailIngredient(child);
  };
  return (
    <div className={styles.tagSectionContainer}>
      {recipeFilterByIngredientCategory ? (
        <>
          <OptionSelectHeader />
          {recipeFilterByIngredientCategory === "Type" ||
          "Ingredient" ||
          "Diet" ||
          "Allergies" ||
          "Equipment" ||
          "Drugs" ? (
            <OptionSelect childIngredient={childIngredient} />
          ) : null}

          {recipeFilterByIngredientCategory === "Nutrition" ? (
            <NumericFilter childIngredient={childIngredient} />
          ) : null}
          {recipeFilterByIngredientCategory === "Collection" || "Dynamic" ? (
            <CheckboxOptions />
          ) : null}
        </>
      ) : (
        <>
          <input className={styles.tagSectionInput} placeholder="Search" />
          <div
            className={styles.singleItem}
            onClick={() => recipeFilterByCategroy("Type")}
          >
            <h5>Type</h5>
          </div>
          {
            <CustomAccordion title="Ingredient" iconRight={true}>
              {categories?.length
                ? categories?.map((item, index) => {
                    return (
                      <div
                        className={styles.singleItemInside}
                        key={index}
                        onClick={() =>
                          recipeFilterByCategroy("Ingredient", item?.title)
                        }
                      >
                        <h5>{item?.title}</h5>
                      </div>
                    );
                  })
                : null}
            </CustomAccordion>
          }
          <CustomAccordion title="Nutrition" iconRight={true}>
            {nutritionList?.length
              ? nutritionList?.map((item, index) => {
                  return (
                    <div
                      className={styles.singleItemInside}
                      key={index}
                      onClick={() => recipeFilterByCategroy("Nutrition", item)}
                    >
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
