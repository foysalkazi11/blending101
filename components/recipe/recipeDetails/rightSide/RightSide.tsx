/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomAccordion from "../../../../theme/accordion/accordion.component";
import styles from "./RightSide.module.scss";
import { nutrition } from "../../fackData/recipeDetails";
import LinearComponent from "../../../../theme/linearProgress/LinearProgress.component";
import RecursiveAccordian from "../../../customRecursiveAccordian/recursiveAccordian.component";

const health = [
  { name: "Vitamin A", percent: 100 },
  { name: "Vitexin", percent: 90 },
  { name: "Vitamin D", percent: 87 },
  { name: "Iron", percent: 69 },
  { name: "Betaxanthins", percent: 50 },
  { name: "Calcium", percent: 35 },
  { name: "Quercetiin", percent: 20 },
];

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

interface PassingProps {
  name: string;
  percent: number;
}

const RightSide = () => {
  return (
    <div>
      <div className={styles.header}>
        <img src="/icons/chart-bar-light-green.svg" alt="bar icon" />
        <h3>Rx Facts</h3>
      </div>
      <div className={styles.content}>
        <h3>Nutrition</h3>
        <div className={styles.nutritionHeader}>
          <p>Amount Per Serving Calories</p>
          <div className={styles.recursiveAccordianHeading}>
            <div className={styles.recursiveAccordianHeading__heading}>
              <div className={styles.recursiveAccordianHeading__heading__1}>
                Calories
              </div>
              <div className={styles.recursiveAccordianHeading__heading__2}>
                93
              </div>
            </div>
            <div className={styles.recursiveAccordianHeading__subheading}>
              <div className={styles.recursiveAccordianHeading__subheading__3}>
                Value
              </div>
              <div className={styles.recursiveAccordianHeading__subheading__4}>
                Daily%
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ingredientsDetails}>
          <RecursiveAccordian dataObject={nestedAccordian} />
        </div>
      </div>

      <div className={styles.linerProgessContainer}>
        <h3>Health</h3>
        <p>Disease, Conditions and Systems</p>
        {health.map(({ name, percent }: PassingProps, index) => {
          return <LinearComponent name={name} percent={percent} key={index} />;
        })}
      </div>
    </div>
  );
};

export default RightSide;
