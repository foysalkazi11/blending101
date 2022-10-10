import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import SkeletonElement from "../../../../../theme/skeletons/SkeletonElement";
import s from "./index.module.scss";

interface Props {
  lineChartData?: any[];
  loading?: boolean;
  category?: string;
  chartDurationPoint?: string;
}

const month_names_short = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: Date) {
  let month = "" + date?.getMonth();
  let day = "" + date?.getDate();
  let year = date?.getFullYear();

  // if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return {
    day,
    month: month_names_short[month],
    year,
  };
}

const LineChart = ({
  lineChartData = [],
  loading = false,
  category = "",
  chartDurationPoint = "M",
}: Props) => {
  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // const measurement = measurementConverter(category, payload[0].value);
      const formatedDate = formatDate(new Date(payload[0].payload?.assignDate));
      const durationYearOrYearToday =
        chartDurationPoint === "Y" || chartDurationPoint === "YD";
      return (
        <div className={s.customTooltipBox}>
          <p className={s.label}>{`Consume : ${payload[0].value?.toFixed(
            2,
          )}`}</p>
          <p className={s.dateLabel}>{`${formatedDate?.month} ${
            chartDurationPoint === "Y" || chartDurationPoint === "YD"
              ? ""
              : formatedDate?.day
          }${durationYearOrYearToday ? "" : ","} ${formatedDate?.year}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className={s.lineChartBoxContainer}>
      {loading ? (
        <SkeletonElement
          type="thumbnail"
          style={{ width: "200px", height: "100px" }}
        />
      ) : lineChartData?.length ? (
        chartDurationPoint === "Y" || chartDurationPoint === "YD" ? (
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
            <Tooltip content={customTooltip} />
            <Area
              type="monotone"
              dataKey="totalAmount"
              stroke="#7dbd3b"
              fill="#d2e7bc"
            />
          </AreaChart>
        ) : (
          <BarChart
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
            <Tooltip content={customTooltip} />
            <Bar dataKey="totalAmount" fill="#d2e7bc" />
          </BarChart>
        )
      ) : (
        <p className={s.noRecordFound}>No record found</p>
      )}
    </div>
  );
};

export default LineChart;
