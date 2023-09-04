import React, { useMemo } from "react";
import { faLightbulbOn } from "@fortawesome/pro-light-svg-icons";
import HSBar from "react-horizontal-stacked-bar-chart";

import IconHeading from "../../../theme/iconHeading/iconHeading.component";

import styles from "./Insights.module.scss";
import { useQuery } from "@apollo/client";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { RECIPE_CATEGORY_COLOR } from "../../../data/Recipe";
import TopIngredients from "../../molecules/Charts/TopIngredients.component";
import MacroMakeup, {
  IMacroData,
} from "../../molecules/Charts/MacroMakeup.component";

interface InsightsProps {
  categories: any[];
  ingredients: any[];
  macros?: IMacroData;
  height?: string;
}

const Insights = (props: InsightsProps) => {
  const { categories, height, ingredients, macros } = props;
  return (
    <div className={styles.insights}>
      <IconHeading icon={faLightbulbOn} title="Plan Insights" />
      <div
        className={styles.insights__body}
        style={{ height: height || "auto" }}
      >
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
        <MacroMakeup showBar={false} macros={macros} />
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
    <div>
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
