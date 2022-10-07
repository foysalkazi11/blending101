import React, { useState, useEffect } from "react";
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
  const [totalConsumption, setTotalConsumption] = useState(0);

  return (
    <div className={s.description}>
      <div className={s.singleItem}>
        <p>Daily Average</p>
        <p>
          <span>{dailyAverage}</span>
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Daily Recommended</p>
        <p>
          <span>{dailyRecomended}</span>
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Attainment</p>
        <p>
          <span>{attainment}</span>
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Upper Limit</p>
        <p>
          <span>{upperLimit}</span>
        </p>
      </div>
    </div>
  );
};

export default LineChartHeadingForIngredient;
