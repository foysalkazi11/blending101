import React, { useMemo } from "react";
import {
  ResponsiveContainer,
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

interface InsightsProps {
  categories: any[];
  ingredients: any[];
}

const Insights = (props: InsightsProps) => {
  const { categories, ingredients } = props;
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
        <BlendType categories={categories} />
        <TopIngredients ingredients={ingredients} />
        <MacroMakeup />
      </div>
    </div>
  );
};

export default Insights;

const BlendType = ({ categories }) => {
  const { data } = useQuery(GET_BLEND_CATEGORY);
  const types = useMemo(
    () =>
      categories?.map((category) => ({
        value: category?.percentage,
        color: RECIPE_CATEGORY_COLOR[category.name],
      })),
    [categories],
  );
  return (
    <div className="mt-50 mb-50">
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
                style={{
                  backgroundColor: RECIPE_CATEGORY_COLOR[category.label],
                }}
              />
              <p className={styles.challenge_circle_food_name}>
                {category.label}
              </p>
            </div>
          ))}
        </div>
        <div id={styles.insights__progress_wrapper}>
          <HSBar
            height="50px"
            id={styles.insights__progress}
            data={types || []}
          />
        </div>
      </div>
    </div>
  );
};

const renderCustomizedLabel = ({ x, y, value }) => (
  <image x={x - 40} y={y - 5} href={value} height="28" width="28" />
);

const renderIngredientName = ({ x, y, value }) => (
  <text name={value} x={x} y={y} width="246.75" height="22" offset="35">
    <tspan x="100" dy="1em">
      {value}
    </tspan>
  </text>
);

const TopIngredients = ({ ingredients }) => {
  return (
    <div className="mb-50">
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
              dataKey="&nbsp;"
            />
            <Bar dataKey="count" fill="#FFA482" layout="vertical">
              <LabelList
                dataKey="featuredImage"
                position="left"
                content={renderCustomizedLabel}
              />
              <LabelList
                dataKey="count"
                position="insideLeft"
                formatter={(value) => `${value} | `}
              />
              <LabelList
                dataKey="name"
                position="insideLeft"
                content={renderIngredientName}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
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

const macroMakeup = [
  { name: "Carbs", value: 400 },
  { name: "Fats", value: 300 },
  { name: "Protein", value: 300 },
];
const COLORS = ["#B9EB84", "#66A7FF", "#FF8252"];
