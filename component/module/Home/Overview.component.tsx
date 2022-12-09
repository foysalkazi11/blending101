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

import styles from "./Overview.module.scss";
import { useQuery } from "@apollo/client";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { RECIPE_CATEGORY_COLOR } from "../../../data/Recipe";
import { GET_RECENT_CHALLENGES } from "../../../graphql/Challenge";
import { format, isAfter, isToday, subDays } from "date-fns";
import { getBackgroundColor } from "../Challenge/Achievement/_Dialer.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setChallengeDate } from "../../../redux/slices/Challenge.slice";

const Overview = () => {
  return (
    <div className={styles.insights}>
      <div className={styles.insights__body}>
        <BlendType />
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
    <div className={styles.insights__graph}>
      <h3 className="mb-20">RX Score</h3>
      <HSBar
        height={"20px"}
        id={styles.insights__progress}
        data={[
          { value: 32, color: "#FF8252" },
          { value: 30, color: "#66A7FF" },
          { value: 25, color: "#B9EB84" },
          { value: 13, color: "#f7f7f7" },
        ]}
      />
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

const BlendType = () => {
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
    <div className={styles.insights__graph}>
      <h3>Blending Trend</h3>
      <div className={styles.wheel}>
        {data?.getLastSevenDaysChallenge.map((activity, key) => {
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
  console.log(payload);
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
