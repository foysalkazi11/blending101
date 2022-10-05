import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import SkeletonElement from "../../../../../../theme/skeletons/SkeletonElement";
import s from "./index.module.scss";

interface Props {
  lineChartData?: any[];
  loading?: boolean;
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const LineChart = ({ lineChartData = [], loading = false }: Props) => {
  return (
    <div className={s.lineChartBoxContainer}>
      {loading ? (
        <SkeletonElement
          type="thumbnail"
          style={{ width: "200px", height: "100px" }}
        />
      ) : lineChartData?.length ? (
        <AreaChart
          width={200}
          height={100}
          data={lineChartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <Area
            type="monotone"
            dataKey="consumptionInGram"
            stroke="#7dbd3b"
            fill="#d2e7bc"
          />
        </AreaChart>
      ) : (
        <p className={s.noRecordFound}>No record found</p>
      )}
    </div>
  );
};

export default LineChart;
