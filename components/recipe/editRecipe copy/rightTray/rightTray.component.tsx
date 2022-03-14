/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import RightHeader from "../header/right_header/right_header.component";
import styles from "./rightTray.module.scss";
import Image from "next/image";
import { healthList } from "./rightTray";
import LinearComponent from "../../../../theme/linearProgress/LinearProgress.component";
import { useAppSelector } from "../../../../redux/hooks";
import { useLazyQuery } from "@apollo/client";
import { NUTRITION_BASED_RECIPE } from "../../../../gqlLib/recipes/queries/getEditRecipe";
import RecursiveAccordian from "../../../customRecursiveAccordian/recursiveAccordian.component";
import UpdatedRecursiveAccordian from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";

interface PassingProps {
  name: string;
  percent: number;
}

const recursiveData = (data) => {
  if (!data) return;
  let { energy, vitamins, minerals } = data;
  return {
    Energy: {
      Protein: {
        value: energy?.childs?.proteins?.value,
        Unit: energy?.childs?.proteins?.blendNutrientRefference?.units,
        children: {},
      },
      Fats: {
        value: energy?.childs?.fats?.value,
        Unit: energy?.childs?.fats?.blendNutrientRefference?.units,
        children: {},
      },
      Carbohydrates: {
        value: energy?.childs?.carbohydrates?.value,
        Unit: energy?.childs?.carbohydrates?.blendNutrientRefference?.units,
        children: {
          "Dietary Fiber": {
            value: energy?.childs?.carbohydrates?.dietryFibre?.value,
            Unit: energy?.childs?.carbohydrates?.dietryFibre.blendNutrientRefference
              ?.units,
            children: {},
          },
          Sugars: {
            value: energy?.childs?.carbohydrates?.sugars?.value,
            Unit: energy?.childs?.carbohydrates?.sugars?.blendNutrientRefference?.units,
            children: {
              Sucrose: {
                value: energy?.childs?.carbohydrates?.sugars?.childs?.sucrose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.sucrose
                  ?.blendNutrientRefference?.units,
                children: {},
              },
              Glucose: {
                value: energy?.childs?.carbohydrates?.sugars?.childs?.glucose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.glucose
                  ?.blendNutrientRefference?.units,
                children: {},
              },
              Fructose: {
                value: energy?.childs?.carbohydrates?.sugars?.childs?.fructose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.fructose
                  ?.blendNutrientRefference?.units,
                children: {},
              },
              Lactose: {
                value: energy?.childs?.carbohydrates?.sugars?.childs?.lactose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.lactose
                  ?.blendNutrientRefference?.units,
                children: {},
              },
              Maltose: {
                value: energy?.childs?.carbohydrates?.sugars?.childs?.maltose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.maltose
                  ?.blendNutrientRefference?.units,
                children: {},
              },
              Galactose: {
                value: energy?.childs?.carbohydrates?.sugars?.childs?.galactose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.galactose
                  ?.blendNutrientRefference?.units,
                children: {},
              },
            },
          },
          Starch: {
            value: energy?.childs?.carbohydrates?.starch?.value,
            Unit: energy?.childs?.carbohydrates?.starch?.blendNutrientRefference?.units,
            children: {},
          },
        },
      },
    },
    Vitamins: {
      "Vitamin C": {
        value: vitamins?.childs?.vitaminC?.value,
        Unit: vitamins?.childs?.vitaminC?.blendNutrientRefference?.units,
        children: {},
      },
      Thiamin: {
        value: vitamins?.childs?.thiamin?.value,
        Unit: vitamins?.childs?.thiamin?.blendNutrientRefference?.units,
        children: {},
      },
      Riboflavin: {
        value: vitamins?.childs?.riboflavin?.value,
        Unit: vitamins?.childs?.riboflavin?.blendNutrientRefference?.units,
        children: {},
      },
      Niacin: {
        value: vitamins?.childs?.niacin?.value,
        Unit: vitamins?.childs?.niacin?.blendNutrientRefference?.units,
        children: {},
      },
      "Pantothenic acid": {
        value: vitamins?.childs?.pantothenicAcid?.value,
        Unit: vitamins?.childs?.pantothenicAcid?.blendNutrientRefference?.units,
        children: {},
      },
      "Vitamin B-6": {
        value: vitamins?.childs?.vitaminB6?.value,
        Unit: vitamins?.childs?.vitaminB6?.blendNutrientRefference?.units,
        children: {},
      },
      Biotin: {
        value: vitamins?.childs?.biotin?.value,
        Unit: vitamins?.childs?.biotin?.blendNutrientRefference?.units,
        children: {},
      },
      Folate: {
        value: vitamins?.childs?.folate?.value,
        Unit: vitamins?.childs?.folate?.blendNutrientRefference?.units,
        children: {},
      },
      Choline: {
        value: vitamins?.childs?.choline?.value,
        Unit: vitamins?.childs?.choline?.blendNutrientRefference?.units,
        children: {},
      },
      Betaine: {
        value: vitamins?.childs?.betaine?.value,
        Unit: vitamins?.childs?.betaine?.blendNutrientRefference?.units,
        children: {},
      },
      "Vitamin B-12": {
        value: vitamins?.childs?.vitaminB12?.value,
        Unit: vitamins?.childs?.vitaminB12?.blendNutrientRefference?.units,
        children: {},
      },
      "Vitamin A": {
        value: vitamins?.childs?.vitaminA?.value,
        Unit: vitamins?.childs?.vitaminA?.blendNutrientRefference?.units,
        children: {},
      },
      "Vitamin E": {
        value: vitamins?.childs?.vitaminE?.value,
        Unit: vitamins?.childs?.vitaminE?.blendNutrientRefference?.units,
        children: {},
      },
      "Vitamin D": {
        value: vitamins?.childs?.vitaminD?.value,
        Unit: vitamins?.childs?.vitaminD?.blendNutrientRefference?.units,
        children: {},
      },
      "Vitamin K": {
        value: vitamins?.childs?.vitaminK?.value,
        Unit: vitamins?.childs?.vitaminK?.blendNutrientRefference?.units,
        children: {},
      },
    },
    Minerals: {
      Calcium: {
        value: minerals?.childs?.calcium?.value,
        Unit: minerals?.childs?.calcium?.blendNutrientRefference?.units,
        children: {},
      },
      Iron: {
        value: minerals?.childs?.iron?.value,
        Unit: minerals?.childs?.iron?.blendNutrientRefference?.units,
        children: {},
      },
      Magnesium: {
        value: minerals?.childs?.magnesium?.value,
        Unit: minerals?.childs?.magnesium?.blendNutrientRefference?.units,
        children: {},
      },
      Phosphorus: {
        value: minerals?.childs?.phosphorus?.value,
        Unit: minerals?.childs?.phosphorus?.blendNutrientRefference?.units,
        children: {},
      },
      Potassium: {
        value: minerals?.childs?.potassium?.value,
        Unit: minerals?.childs?.potassium?.blendNutrientRefference?.units,
        children: {},
      },
      Sodium: {
        value: minerals?.childs?.sodium?.value,
        Unit: minerals?.childs?.sodium?.blendNutrientRefference?.units,
        children: {},
      },
      Zinc: {
        value: minerals?.childs?.zinc?.value,
        Unit: minerals?.childs?.zinc?.blendNutrientRefference?.units,
        children: {},
      },
      Copper: {
        value: minerals?.childs?.copper?.value,
        Unit: minerals?.childs?.copper?.blendNutrientRefference?.units,
        children: {},
      },
      Manganese: {
        value: minerals?.childs?.manganese?.value,
        Unit: minerals?.childs?.manganese?.blendNutrientRefference?.units,
        children: {},
      },
      Iodine: {
        value: minerals?.childs?.iodine?.value,
        Unit: minerals?.childs?.iodine?.blendNutrientRefference?.units,
        children: {},
      },
      Salenium: {
        value: minerals?.childs?.salenium?.value,
        Unit: minerals?.childs?.salenium?.blendNutrientRefference?.units,
        children: {},
      },
      "Sulfur, S": {
        value: minerals?.childs?.sulfur?.value,
        Unit: minerals?.childs?.sulfur?.blendNutrientRefference?.units,
        children: {},
      },
      "Nickel, Ni": {
        value: minerals?.childs?.nickel?.value,
        Unit: minerals?.childs?.nickel?.blendNutrientRefference?.units,
        children: {},
      },
      "Molybdenum, Mo": {
        value: minerals?.childs?.molybdenum?.value,
        Unit: minerals?.childs?.molybdenum?.blendNutrientRefference?.units,
        children: {},
      },
      "Colbalt, Co": {
        value: minerals?.childs?.colbalt?.value,
        Unit: minerals?.childs?.colbalt?.blendNutrientRefference?.units,
        children: {},
      },
      "Boron, B": {
        value: minerals?.childs?.boron?.value,
        Unit: minerals?.childs?.boron?.blendNutrientRefference?.units,
        children: {},
      },
      Fluoride: {
        value: minerals?.childs?.Fluoride?.value,
        Unit: minerals?.childs?.Fluoride?.blendNutrientRefference?.units,
        children: {},
      },
    },
  };
};

const RightTray = ({ nutritionData }) => {
  const [NutritionStateTemp, setNutritionStateTemp] = useState(null);
  const nutritionState = useAppSelector(
    (state) => state?.quantityAdjuster?.nutritionState
  );

  // console.log(nutritionData);
  return (
    <div>
      <RightHeader />
      <div className={styles.right}>
        <div className={styles.right__title}>Nutrition</div>
        <div className={styles.right__sub_heading}>Amount Per Servings Calories</div>
        <div className={styles.compoent__box__nutrition}>
          {nutritionData ? (
            <UpdatedRecursiveAccordian dataObject={recursiveData(nutritionData)} />
          ) : null}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.right__title}>Health</div>
        <div className={styles.right__sub_heading}>Disease, Condition and Systems</div>
        <div className={styles.compoent__box} style={{}}>
          {healthList?.map(({ name, percent }: PassingProps, index) => {
            return <LinearComponent name={name} percent={percent} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RightTray;
