import React, { useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import { faLightbulbOn } from "@fortawesome/pro-light-svg-icons";
import HSBar from "react-horizontal-stacked-bar-chart";

import IconHeading from "../../../theme/iconHeading/iconHeading.component";

import styles from "./Statistics.module.scss";

const Statistics = () => {
  return (
    <div className={styles.statistics}>
      <IconHeading icon={faLightbulbOn} title={"Challenge Stats"} />
      <div className={styles.statistics__body}>
        <div className={styles.statistics__graph}>
          <h3>Leaderboard</h3>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart layout="vertical" data={leaderboard}>
              <XAxis hide type="number" />
              <YAxis
                tickLine={false}
                padding={{ top: 20 }}
                axisLine={false}
                type="category"
                dataKey="score"
                unit="%"
              />
              <Bar dataKey="score" fill="#DDF5C2" layout="vertical" name="name">
                <LabelList dataKey="name" position="insideLeft" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <RxScore />
        <TopIngredients />
      </div>
    </div>
  );
};

export default Statistics;

const RxScore = () => {
  const [type, setType] = useState<"Weekly" | "Monthly">("Weekly");
  return (
    <div className={styles.statistics__graph}>
      <h3 className="mb-20">RX Score</h3>
      <HSBar
        height={"20px"}
        id={styles.statistics__progress}
        data={[
          { value: 32, color: "#FF8252" },
          { value: 30, color: "#66A7FF" },
          { value: 25, color: "#B9EB84" },
          { value: 13, color: "#f7f7f7" },
        ]}
      />
      <div className={styles.statistics__legend}>
        <span>
          Variety <i style={{ background: "#b9eb84" }}>20</i>
        </span>
        <span>
          Quality <i style={{ background: "#66A7FF", color: "#fff" }}>30</i>
        </span>
        <span>
          Quantity <i style={{ background: "#FF8252", color: "#fff" }}>10</i>
        </span>
      </div>
      <ResponsiveContainer width="100%" height={170}>
        {type === "Weekly" ? (
          <BarChart
            data={rxScore}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" tickLine={false} />
            <YAxis tickLine={false} />
            <Tooltip />
            <Bar dataKey="pv" stackId="a" fill="#FF8252" />
            <Bar dataKey="uv" stackId="a" fill="#66A7FF" />
            <Bar dataKey="amt" stackId="a" fill="#B9EB84" />
          </BarChart>
        ) : (
          <AreaChart
            width={500}
            height={400}
            data={rxScore}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stackId="1"
              stroke="#FF8252"
              fill="#FF8252"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              stroke="#66A7FF"
              fill="#66A7FF"
            />
            <Area
              type="monotone"
              dataKey="amt"
              stackId="1"
              stroke="#B9EB84"
              fill="#B9EB84"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
      <div className={styles.statistics__timeframes}>
        <button
          style={type === "Weekly" ? { backgroundColor: "#B9EB84" } : {}}
          onClick={() => setType("Weekly")}
        >
          Weekly
        </button>
        <button
          style={type === "Monthly" ? { backgroundColor: "#B9EB84" } : {}}
          onClick={() => setType("Monthly")}
        >
          Monthly
        </button>
      </div>
    </div>
  );
};

const renderCustomizedLabel = (props) => {
  const { x, y, value } = props;

  return <image x={x - 40} y={y - 10} href={value} height="25" width="25" />;
};

const TopIngredients = () => {
  const [type, setType] = useState<"Weekly" | "Monthly">("Weekly");

  return (
    <div className={styles.statistics__graph}>
      <h3>Top Ingredients</h3>
      <h5>Servings</h5>
      <ResponsiveContainer width="100%" height={170}>
        <BarChart layout="vertical" data={ingredients}>
          <XAxis hide type="number" />
          <YAxis
            tickLine={false}
            padding={{ top: 20 }}
            axisLine={false}
            type="category"
            dataKey="name"
          />
          <Bar dataKey="quantity" fill="#FFA482" layout="vertical">
            <LabelList
              dataKey="icon"
              position="left"
              content={renderCustomizedLabel}
            />
            <LabelList
              dataKey="quantity"
              position="insideLeft"
              formatter={(value) => `${value} | `}
            />
            <LabelList dataKey="label" position="insideLeft" offset={35} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className={styles.statistics__timeframes}>
        <button
          style={type === "Weekly" ? { backgroundColor: "#B9EB84" } : {}}
          onClick={() => setType("Weekly")}
        >
          Weekly
        </button>
        <button
          style={type === "Monthly" ? { backgroundColor: "#B9EB84" } : {}}
          onClick={() => setType("Monthly")}
        >
          Monthly
        </button>
      </div>
    </div>
  );
};

const rxScore = [
  {
    name: "S",
    uv: 60,
    pv: 34,
    amt: 23,
  },
  {
    name: "M",
    uv: 15,
    pv: 35,
    amt: 26,
  },
  {
    name: "T",
    uv: 52,
    pv: 72,
    amt: 12,
  },
  {
    name: "W",
    uv: 123,
    pv: 74,
    amt: 93,
  },
  {
    name: "T",
    uv: 82,
    pv: 107,
    amt: 34,
  },
  {
    name: "F",
    uv: 96,
    pv: 61,
    amt: 123,
  },
  {
    name: "S",
    uv: 115,
    pv: 24,
    amt: 23,
  },
];

const leaderboard = [
  {
    name: "Badhon Khan",
    score: 94,
  },
  {
    name: "Faysal Khan",
    score: 67,
  },
  {
    name: "Gabriel Braun",
    score: 76,
  },
  {
    name: "Abdul Rafay Ghani",
    score: 49,
  },
  {
    name: "Jubel Ahmed",
    score: 73,
  },
];

const ingredients = [
  {
    icon: "https://freepngimg.com/thumb/orange/19-orange-png-image-download.png",
    label: "Orange",
    quantity: 22,
  },
  {
    icon: "https://freepngimg.com/thumb/strawberry/1-strawberry-png-images.png",
    label: "Strawberry",
    quantity: 18,
  },
  {
    icon: "https://freepngimg.com/thumb/apple/9-apple-png-image.png",
    label: "Apple",
    quantity: 15,
  },
  {
    icon: "https://freepngimg.com/thumb/mango/1-2-mango-png.png",
    label: "Mango",
    quantity: 15,
  },
  {
    icon: "https://freepngimg.com/thumb/pineapple/2-pineapple-png-image-download.png",
    label: "Pineapple",
    quantity: 15,
  },
];
