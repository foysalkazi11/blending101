import React, { useMemo, useRef, useState } from "react";
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
import IconHeading from "../../../theme/iconHeading/iconHeading.component";

import styles from "./Statistics.module.scss";
import { useAppSelector } from "../../../redux/hooks";

const useStatistics = (statistics) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [rxScore, setRxScore] = useState([]);
  const [topIngredients, setTopIngredients] = useState([]);

  useMemo(() => {
    setLeaderboard(
      statistics?.sharedWith.map((user) => ({
        id: user?.memberId?._id,
        name: user?.memberId?.displayName,
        profile: user?.memberId?.image,
        score: Math.round(user?.blendScore),
      })) || [],
    );
    setTopIngredients(
      statistics?.topIngredients.slice(0, 5).map((ing) => ({
        icon:
          ing?.ingredientId?.featuredImage ||
          "https://freepngimg.com/thumb/mango/1-2-mango-png.png",
        label: ing?.ingredientId?.ingredientName,
        quantity: ing?.count,
      })) || [],
    );
  }, [statistics]);
  return { leaderboard, rxScore, topIngredients };
};

const Statistics = ({ statistics }) => {
  const { leaderboard, rxScore, topIngredients } = useStatistics(statistics);
  return (
    <div className={styles.statistics}>
      <IconHeading icon={faLightbulbOn} title={"Challenge Stats"} />
      <div className={styles.statistics__body}>
        <Leaderboard
          leaderboard={leaderboard}
          myScore={statistics?.blendScore}
        />
        <RxScore />
        <TopIngredients ingredients={topIngredients} />
      </div>
    </div>
  );
};

export default Statistics;

const Leaderboard = ({ leaderboard, myScore }) => {
  const { _id: userId, image } = useAppSelector((state) => state.user?.dbUser);
  const meInLeaderboard = useMemo(() => {
    return leaderboard.some((leader) => leader.id === userId);
  }, [leaderboard, userId]);
  return (
    <div className="mb-50">
      <div className={styles.statistics__graph}>
        <h3>Leaderboard</h3>
        <ul className={styles.leaderboard}>
          {leaderboard?.map((leader) => {
            const myself = leader.id === userId;
            return (
              <li className={styles.leaderboard__item} key={leader.id}>
                <div className={styles.leaderboard__info}>
                  <span>
                    <img
                      src={leader.profile || "/images/user-profile.png"}
                      alt="User"
                    />
                    <h6 style={{ fontWeight: myself ? "500" : "normal" }}>
                      {myself ? "You" : leader.name}
                    </h6>
                  </span>
                  <span>{leader.score}%</span>
                </div>
                <div className={styles.leaderboard__progress}>
                  <div style={{ width: `${leader.score}%` }} />
                </div>
              </li>
            );
          })}
          {!meInLeaderboard && (
            <li className={styles.leaderboard__item}>
              <div className={styles.leaderboard__info}>
                <span>
                  <img src={image || "/images/user-profile.png"} alt="User" />
                  <h6 style={{ fontWeight: 500 }}>You</h6>
                </span>
                <span>{Math.ceil(myScore) || 0}%</span>
              </div>
              <div className={styles.leaderboard__progress}>
                <div style={{ width: `${myScore}%` }} />
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const RxScore = () => {
  const [type, setType] = useState<"Weekly" | "Monthly">("Weekly");
  return (
    <div className="mb-50">
      <div className={styles.statistics__graph}>
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
        <div className={styles.statistics__score}>
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
    </div>
  );
};

const renderCustomizedLabel = (props) => {
  const { x, y, value } = props;

  return <image x={x - 40} y={y - 2} href={value} height="25" width="25" />;
};

const TopIngredients = ({ ingredients }) => {
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
