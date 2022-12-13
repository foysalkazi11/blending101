import React, { useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { faLightbulbOn } from "@fortawesome/pro-light-svg-icons";
import HSBar from "react-horizontal-stacked-bar-chart";

import IconHeading from "../../../theme/iconHeading/iconHeading.component";

import styles from "./Insights.module.scss";
import { useQuery } from "@apollo/client";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { RECIPE_CATEGORY_COLOR } from "../../../data/Recipe";

const Insights = () => {
  return (
    <div className={styles.insights}>
      <IconHeading icon={faLightbulbOn} title="Plan Insights" />
      <div className={styles.insights__body}>
        <div className={`row ${styles.insights__summary}`}>
          <div className="col-4">
            <h4>786</h4>
            <span>RX Score</span>
          </div>
          <div className="col-4">
            <h4>73</h4>
            <span>Calories</span>
          </div>
          <div className="col-4">
            <h4>$4.56</h4>
            <span>Cost</span>
          </div>
        </div>
        <BlendType />
        <TopIngredients />
        <MacroMakeup />
      </div>
    </div>
  );
};

export default Insights;

const BlendType = () => {
  const { data } = useQuery(GET_BLEND_CATEGORY);
  return (
    <div className={styles.insights__graph}>
      <h3>Blend Type</h3>
      <div className={styles.challenge_circle}>
        {data?.getAllCategories?.map((category) => (
          <div
            className={styles.challenge_circle_food_box}
            key={category.value}
          >
            <div
              className={styles.challenge_circle_food_color_represent}
              style={{ backgroundColor: RECIPE_CATEGORY_COLOR[category.label] }}
            />
            <p className={styles.challenge_circle_food_name}>
              {category.label}
            </p>
          </div>
        ))}
      </div>
      <HSBar
        height={"35px"}
        id={styles.insights__progress}
        data={[
          { value: 32, color: "#FF8252" },
          { value: 30, color: "#66A7FF" },
          { value: 25, color: "#B9EB84" },
        ]}
      />
    </div>
  );
};

const renderCustomizedLabel = (props) => {
  const { x, y, value } = props;

  return <image x={x - 40} y={y - 10} href={value} height="25" width="25" />;
};

const TopIngredients = () => {
  return (
    <div className={styles.insights__graph}>
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
    </div>
  );
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className={styles.insights__legend}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>
          {entry?.value}
          <span style={{ backgroundColor: entry?.color }}>
            {entry?.payload?.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

const MacroMakeup = () => (
  <div className={styles.insights__graph}>
    <h3 className="mb-20">RX Score</h3>
    <ResponsiveContainer width={"100%"} height={200}>
      <PieChart margin={{ top: 120 }}>
        <Pie
          data={macroMakeup}
          startAngle={180}
          endAngle={0}
          innerRadius={100}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
        >
          {macroMakeup.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          height={36}
          margin={{ top: 80 }}
          content={renderLegend}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

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

const macroMakeup = [
  { name: "Carbs", value: 400 },
  { name: "Fats", value: 300 },
  { name: "Protein", value: 300 },
];
const COLORS = ["#B9EB84", "#66A7FF", "#FF8252"];
