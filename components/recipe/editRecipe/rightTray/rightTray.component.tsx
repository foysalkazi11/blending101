/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import RightHeader from "../header/right_header/right_header.component";
import styles from "./rightTray.module.scss";
import Accordion from "../../../../theme/accordion/accordion.component";
import Image from "next/image";
import { healthList } from "./rightTray";
import LinearComponent from "../../../../theme/linearProgress/LinearProgress.component";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useLazyQuery } from "@apollo/client";
import { NUTRITION_BASED_RECIPE } from "../../../../gqlLib/recipes/queries/getEditRecipe";
import RecursiveAccordian from "../../../customRecursiveAccordian/recursiveAccordian.component";

interface PassingProps {
  name: string;
  percent: number;
}

const RightTray = () => {
  const nutritionState = useAppSelector(
    (state) => state.quantityAdjuster.nutritionState
  );

  const [NutritionStateTemp, SetNutritionStateTemp] = useState("");
  const [
    filterIngredientByCategoryAndClass,
    { loading: searchInProcess, data: searchElement },
  ] = useLazyQuery(
    NUTRITION_BASED_RECIPE(`[
  ${NutritionStateTemp}
  ]`),
    {
      fetchPolicy: "network-only",
      //   variables: { classType: "All"
      // },
    }
  );

  const fetchSearchResults = async () => {
    await filterIngredientByCategoryAndClass();

    let Calories = "";

    searchElement?.getNutritionBasedOnRecipe.map((elem) => {
      let nutritionArgument = {
        ingredientId: elem.uniqueNutrientRefference._id,
        value: elem.value,
      };

      let nutritionArguentString =
        `{` +
        `ingredientId:${nutritionArgument.ingredientId}` +
        `,` +
        `value:${nutritionArgument.value}` +
        `}`;

      Calories = Calories + JSON.stringify(nutritionArguentString);
    });
    SetNutritionStateTemp(Calories);
  };

  useEffect(() => {
    fetchSearchResults();
    console.log(NutritionStateTemp);
  }, [nutritionState]);

  let nestedAccordian = {
    Energy: {
      Protein: {
        value: "energy 1",
        Unit: "kcal",
        children: {},
      },
      Fats: {
        value: "Fats",
        Unit: "fat",
        children: {},
      },
      Carbohydrates: {
        value: "Carbohydrates",
        Unit: "kcal",
        children: {
          "Dietary Fiber": {
            value: "Carbohydrates",
            Unit: "kcal",
            children: {},
          },
          Sugars: {
            value: "Carbohydrates",
            Unit: "kcal",
            children: {
              Sucrose: {
                value: "Sucrose",
                Unit: "kcal",
                children: {},
              },
              Glucose: {
                value: "Glucose",
                Unit: "kcal",
                children: {},
              },
              Fructose: {
                value: "Fructose",
                Unit: "kcal",
                children: {},
              },
              Lactose: {
                value: "Lactose",
                Unit: "kcal",
                children: {},
              },
              Maltose: {
                value: "Maltose",
                Unit: "kcal",
                children: {},
              },
              Galactose: {
                value: "Galactose",
                Unit: "kcal",
                children: {},
              },
            },
          },
          Starch: {
            value: "Starch",
            Unit: "kcal",
            children: {},
          },
        },
      },
    },
    Vitamins: {
      "Vitamin C": {
        value: "Vitamin C",
        Unit: "kcal",
        children: {},
      },
      Thiamin: {
        value: "Thiamin",
        Unit: "kcal",
        children: {},
      },
      Riboflavin: {
        value: "Riboflavin",
        Unit: "kcal",
        children: {},
      },
      Niacin: {
        value: "Niacin",
        Unit: "kcal",
        children: {},
      },
      "Pantothenic acid": {
        value: "",
        Unit: "kcal",
        children: {},
      },
      "Vitamin B-6": {
        value: "Vitamin B-6",
        Unit: "kcal",
        children: {},
      },
      Biotin: {
        value: "Biotin",
        Unit: "kcal",
        children: {},
      },
      Folate: {
        value: "Folate",
        Unit: "kcal",
        children: {},
      },
      Choline: {
        value: "Choline",
        Unit: "kcal",
        children: {},
      },
      Betaine: {
        value: "Betaine",
        Unit: "kcal",
        children: {},
      },
      "Vitamin B-12": {
        value: "Vitamin B-12",
        Unit: "kcal",
        children: {},
      },
      "Vitamin A": {
        value: "Vitamin A",
        Unit: "kcal",
        children: {},
      },
      "Vitamin K": {
        value:
          "Vitamin K (phylloquinone), Vitamin K (Dihydrophylloquinone), Vitamin K (Menaquinone-4)",
        Unit: "kcal",
        children: {},
      },
    },
    Minerals: {
      Calcium: { value: "Calcium, Ca", Unit: "kcal", children: {} },
    },
  };

  return (
    <div>
      <RightHeader />
      <div className={styles.right}>
        <div className={styles.right__title}>Nutrition</div>
        <div className={styles.right__sub_heading}>
          Amount Per Servings Calories
        </div>
        <div className={styles.right__calories}>
          <h4>Calories</h4>
          <h3>93</h3>
          <div className={styles.right__userIcon}>
            <Image
              src={"/images/user-profile.png"}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <hr />
        <div className={styles.right__subheader}>
          <div className={styles.right__subheader__value}>Value</div>
          <div></div>
          <div className={styles.right__subheader__daily}>Daily %</div>
        </div>
        <div className={styles.compoent__box} style={{}}>
          <RecursiveAccordian dataObject={nestedAccordian} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.right__title}>Health</div>
        <div className={styles.right__sub_heading}>
          Disease, Condition and Systems
        </div>
        <div className={styles.compoent__box} style={{}}>
          {healthList.map(({ name, percent }: PassingProps, index) => {
            return (
              <LinearComponent name={name} percent={percent} key={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightTray;
