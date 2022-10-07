import React from "react";
import s from "./index.module.scss";

interface Props {
  dailyAverage: number;
  dailyRecomended: number;
  attainment: number;
  upperLimit: number;
}

const LineChartHeadingForIngredient = ({
  attainment = 0,
  dailyAverage = 0,
  dailyRecomended = 0,
  upperLimit = 0,
}: Props) => {
  return (
    <div className={s.description}>
      <div className={s.singleItem}>
        <p>Daily Average</p>
        <p>
          <span>{dailyAverage.toFixed(2)}</span>
          mg
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Daily Recommended</p>
        <p>
          <span>{dailyRecomended.toFixed(2)}</span>
          mg
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Attainment</p>
        <p>
          <span>{attainment.toFixed(2)}</span>
          mg
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Upper Limit</p>
        <p>
          <span>{upperLimit.toFixed(2)}</span>
          mg
        </p>
      </div>
    </div>
  );
};

export default LineChartHeadingForIngredient;
