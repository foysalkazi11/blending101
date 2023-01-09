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

import styles from "./Overview.module.scss";
import { useQuery } from "@apollo/client";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { RECIPE_CATEGORY_COLOR } from "../../../data/Recipe";
import { GET_RECENT_CHALLENGES } from "../../../graphql/Challenge";
import { format, isAfter, isToday, subDays } from "date-fns";
import { getBackgroundColor } from "../Challenge/Achievement/_Dialer.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const Overview = () => {
  return (
    <div className={styles.insights}>
      <div className={styles.insights__body}>
        <BlendTrend />
        <RxScore />
        <TopIngredients />
        <MacroMakeup />
      </div>
    </div>
  );
};

export default Overview;

const RxScore = () => {
  const [type, setType] = useState<"Weekly" | "Monthly">("Weekly");
  return (
    <div className="mb-50">
      <div className={styles.insights__graph}>
        <h3 className="mb-20">RX Score</h3>
        <div className={styles.stacked__outline}>
          <span>0</span>
          <div className={styles.stacked}>
            <div id="variety" />
            <div id="quality" />
            <div id="quantity">
              <span className={styles.stacked__total}>
                90
                <i>&nbsp;</i>
              </span>
            </div>
          </div>
          <span>100</span>
        </div>
        <div className={styles.insights__score}>
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
              barGap={7}
              barSize={30}
              margin={{
                left: -20,
              }}
            >
              <XAxis dataKey="name" tickLine={false} />
              <YAxis tickLine={false} />
              <Tooltip />
              <Bar dataKey="variety" stackId="a" fill="#FF8252" />
              <Bar dataKey="quality" stackId="a" fill="#66A7FF" />
              <Bar dataKey="quantity" stackId="a" fill="#B9EB84" />
            </BarChart>
          ) : (
            <AreaChart
              width={500}
              height={400}
              data={rxScore}
              margin={{
                left: -20,
              }}
            >
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="variety"
                stackId="1"
                stroke="#FF8252"
                fill="#FF8252"
              />
              <Area
                type="monotone"
                dataKey="quality"
                stackId="1"
                stroke="#66A7FF"
                fill="#66A7FF"
              />
              <Area
                type="monotone"
                dataKey="quantity"
                stackId="1"
                stroke="#B9EB84"
                fill="#B9EB84"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
        <div className={styles.insights__timeframes}>
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
    </div>
  );
};

const rxScore = [
  {
    name: "S",
    variety: 60,
    quality: 34,
    quantity: 23,
  },
  {
    name: "M",
    variety: 15,
    quality: 35,
    quantity: 26,
  },
  {
    name: "T",
    variety: 52,
    quality: 72,
    quantity: 12,
  },
  {
    name: "W",
    variety: 123,
    quality: 74,
    quantity: 93,
  },
  {
    name: "T",
    variety: 82,
    quality: 107,
    quantity: 34,
  },
  {
    name: "F",
    variety: 96,
    quality: 61,
    quantity: 123,
  },
  {
    name: "S",
    variety: 115,
    quality: 24,
    quantity: 23,
  },
];

function DateButton({ date, isActive, categories, disabled }: any) {
  const days = new Date(date);
  const day = format(days, "d");
  const dayName = format(days, "MMM");

  // Case - 1 - That day is not in the Challenge Range -> Disabled White Circle with border with no text
  if (disabled) {
    return (
      <div
        className={`${styles.wheel__button} ${styles["wheel__button--disabled"]}`}
        style={{
          background: "white",
          border: "1px solid #dddada",
        }}
      />
    );
  } else {
    // Case - 2 - That day is stil not passed -> Disabled White Circle with text and without any border
    if (isAfter(days, new Date())) {
      return (
        <div
          className={`${styles.wheel__button} ${styles["wheel__button--disabled"]}`}
          style={{
            background: "white",
            color: "#333",
          }}
        >
          <p>{day}</p>
          <p>{dayName}</p>
        </div>
      );
    } else {
      // Case - 3 - That day is passed and it didn't had any post -> Disabled grey Circle with text and border
      // Case - 4 - That day is passed and has post -> Colorful circle with text and border
      // Case - 5 - Active Date -> Circle will be highlighted with extra shadow
      const hasPosts = categories.length !== 0;
      return (
        <div
          className={`${styles.wheel__button} ${
            hasPosts ? "" : styles["wheel__button--disabled"]
          }`}
          style={{
            background: getBackgroundColor(categories),
            color: "white",
          }}
        >
          <p>{day}</p>
          <p>{dayName}</p>
        </div>
      );
    }
  }
}

const BlendTrend = () => {
  const date = new Date();
  const today = format(date, "yyyy-MM-dd");
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const { data } = useQuery(GET_RECENT_CHALLENGES, {
    variables: {
      startDate: format(subDays(date, 6), "yyyy-MM-dd"),
      userId,
    },
  });

  return (
    <div className="mb-50">
      <div className={styles.insights__graph}>
        <h3>Blending Trend</h3>
        <div className={styles.wheel}>
          {data?.getLastSevenDaysChallenge?.challenge?.map((activity, key) => {
            const categories = activity?.posts.map(
              (post) => post?.recipeBlendCategory?.name || "",
            );
            return (
              <DateButton
                key={activity?._id}
                date={activity?.date}
                categories={categories}
                disabled={activity?.disabled}
                isActive={
                  today !== ""
                    ? activity?.date === today
                    : isToday(new Date(activity?.date))
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const renderCustomizedLabel = (props) => {
  const { x, y, value } = props;

  return <image x={x - 40} y={y - 10} href={value} height="25" width="25" />;
};

const TopIngredients = () => {
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
