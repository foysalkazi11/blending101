/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomAccordion from "../../../../theme/accordion/accordion.component";
import styles from "./RightSide.module.scss";
import { nutrition } from "../../fackData/recipeDetails";
import LinearComponent from "../../../../theme/linearProgress/LinearProgress.component";

const health = [
  { name: "Vitamin A", percent: 100 },
  { name: "Vitexin", percent: 90 },
  { name: "Vitamin D", percent: 87 },
  { name: "Iron", percent: 69 },
  { name: "Betaxanthins", percent: 50 },
  { name: "Calcium", percent: 35 },
  { name: "Quercetiin", percent: 20 },
];

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
          <table>
            <tr>
              <th>Calories</th>
              <th>93</th>
              <th></th>
            </tr>
            <tr>
              <td></td>
              <td> Value </td>
              <td> Daily% </td>
            </tr>
          </table>
        </div>
        <div className={styles.ingredientsDetails}>
          {nutrition?.map((item, index) => {
            const { section, amount } = item;
            return (
              <CustomAccordion key={index} title={section}>
                <table>
                  {amount?.map((items, index) => {
                    const { label, value, daily } = items;
                    return (
                      <tr key={index}>
                        <td>{label}</td>
                        <td> {value} </td>
                        <td> {daily} </td>
                      </tr>
                    );
                  })}
                </table>
              </CustomAccordion>
            );
          })}
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
