import React, { useState } from "react";
import s from "./index.module.scss";
const chartDuration = [
  {
    name: "Week",
    value: "W",
  },
  {
    name: "Month",
    value: "M",
  },
  {
    name: "YTD",
    value: "YD",
  },
  {
    name: "Year",
    value: "Y",
  },
];

interface Props {
  fetchChartData?: (type?: string) => void;
}

const LineChartDuration = ({ fetchChartData }: Props) => {
  const [chartPoint, setChartPoint] = useState("M");

  const handleChartPoint = (point: string) => {
    setChartPoint(point);
    fetchChartData(point);
  };
  return (
    <div className={s.lineChartDurationPointBox}>
      {chartDuration?.map((point) => {
        return (
          <p
            key={point?.value}
            className={`${s.term} ${
              chartPoint === point?.value ? s.active : ""
            }`}
            onClick={() => handleChartPoint(point?.value)}
          >
            {point?.name}
          </p>
        );
      })}
    </div>
  );
};

export default LineChartDuration;
