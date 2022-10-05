import React, { useState, useEffect } from "react";
import { Portion } from "../../../../../../type/wikiListType";
import s from "./index.module.scss";

interface Props {
  stats?: any[];
  portion?: Portion;
}

const pound = 0.00220462;

const LineChartHeadingForIngredient = ({
  portion = { default: true, measurement: "", meausermentWeight: "" },
  stats = [],
}: Props) => {
  const [totalConsumption, setTotalConsumption] = useState(0);

  useEffect(() => {
    const totalConsumption = stats?.reduce((accumulator, value) => {
      return accumulator + value?.consumptionInGram;
    }, 0);
    setTotalConsumption(totalConsumption);
  }, [stats]);

  return (
    <div className={s.description}>
      <div className={s.singleItem}>
        <p>Total Consumption</p>
        <p>
          <span>{(totalConsumption * pound).toFixed(2)}</span>Pounds
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Total Servings</p>
        <p>
          <span>
            {Math.round(
              totalConsumption / parseInt(portion?.meausermentWeight),
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LineChartHeadingForIngredient;
