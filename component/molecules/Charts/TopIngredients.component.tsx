import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, LabelList } from "recharts";

import styles from "./_Charts.module.scss";

interface IngredientsProps {
  ingredients: TopIngredient[];
}

const TopIngredients = (props: IngredientsProps) => {
  const { ingredients } = props;
  return (
    <div>
      <div className={styles.insights__graph}>
        <h3>Top Ingredients</h3>
        <h5>Servings</h5>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart layout="vertical" data={ingredients}>
            <XAxis hide type="number" />
            <YAxis tickLine={false} padding={{ top: 20 }} axisLine={false} type="category" dataKey="name" />
            <Bar dataKey="quantity" fill="#FFA482" layout="vertical" barSize={30} shape={<CustomBar />}>
              <LabelList dataKey="icon" position="left" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopIngredients;

const CustomBar = (props) => {
  const { fill, x, y, width, payload } = props;
  return (
    <>
      <rect x={x} y={y} width={width} rx={5} height={30} fill={fill} className={styles.rectangle} />
      <text x={x + 10} y={y + 20} fill="#333">
        {payload?.quantity} | {payload?.label}
      </text>
    </>
  );
};

const renderCustomizedLabel = (props) => {
  const { x, y, value } = props;
  return <image x={x - 40} y={y - 2} href={value} height="30" width="30" />;
};

TopIngredients.defaultProps = {
  ingredients: [],
};
