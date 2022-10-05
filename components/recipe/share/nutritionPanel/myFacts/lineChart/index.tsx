import React from "react";
import { Portion } from "../../../../../../type/wikiListType";
import s from "./index.module.scss";
import LineChart from "./LineChart";
import LineChartDuration from "./LineChartDuration";
import LineChartHeadingForIngredient from "./LineChartHeadingForIngredient";
interface Props {
  stats?: any[];
  portion?: Portion;
  fetchChartData?: (type?: string) => void;
  loading?: boolean;
}

const LineChartIndex = ({
  portion = { default: true, measurement: "", meausermentWeight: "" },
  stats = [],
  fetchChartData = () => {},
  loading = false,
}: Props) => {
  return (
    <div className={s.lineChartContainer}>
      <h2 className={s.title}>Ingredients</h2>
      <LineChartHeadingForIngredient portion={portion} stats={stats} />
      <LineChartDuration fetchChartData={fetchChartData} />
      <LineChart lineChartData={stats} loading={loading} />
    </div>
  );
};

export default LineChartIndex;
