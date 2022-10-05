import React, { useEffect, useState } from "react";
import { Portion } from "../../../../../../type/wikiListType";
import s from "./index.module.scss";

const pound = 0.00220462;

interface Props {
  stats?: any[];
  portion?: Portion;
}

const LineChartIndex = ({
  portion = { default: true, measurement: "", meausermentWeight: "" },
  stats = [],
}: Props) => {
  const [totalConsumption, setTotalConsumption] = useState(0);

  useEffect(() => {
    if (stats?.length) {
      const totalConsumption = stats?.reduce((accumulator, value) => {
        return accumulator + value?.consumptionInGram;
      }, 0);
      setTotalConsumption(totalConsumption);
    }
  }, [stats]);
  return (
    <div className={s.lineChartContainer}>
      <h2 className={s.title}>Ingredients</h2>
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
    </div>
  );
};

export default LineChartIndex;
