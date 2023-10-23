import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { GET_INGREDIENTS_RXFACT } from "@/app/graphql/Ingredients";

import styles from "./_summary.module.scss";

interface SummaryProps {
  volume: number;
  consumed: number;
  ingredients: any[];
}

const Summary = (props: SummaryProps) => {
  const { ingredients, consumed, volume } = props;
  const [getIngredientsFact, { data }] = useLazyQuery(GET_INGREDIENTS_RXFACT);

  useEffect(() => {
    getIngredientsFact({
      variables: {
        ingredients: ingredients.map((ing) => ({
          ingredientId: ing?.ingredientId?._id,
          value: ing?.selectedPortion?.gram,
        })),
      },
    });
  }, [getIngredientsFact, ingredients]);

  const { netCarbs, glycemicLoad, calories } = useMemo(() => {
    const fact = data?.getIngredientsFact;
    console.log(consumed, volume);
    const getValue = (value) => {
      return consumed ? ((value * consumed) / volume).toFixed(1) : 0;
    };

    return {
      netCarbs: getValue(fact?.giGl?.netCarbs),
      glycemicLoad: getValue(fact?.giGl?.totalGL),
      calories: getValue(fact?.nutrients?.find((nutrient) => nutrient.name === "Calorie")?.value),
    };
  }, [consumed, data, volume]);

  return (
    <div className={styles.summary__wrapper}>
      <div className="row">
        <div className={`col-4 ${styles.summary}`}>
          <h5>{netCarbs}</h5>
          <p>Net Carbs</p>
        </div>
        <div className={`col-4 ${styles.summary}`}>
          <h5>{glycemicLoad}</h5>
          <p>Glycemic Load</p>
        </div>
        <div className={`col-4 ${styles.summary}`}>
          <h5>{calories}</h5>
          <p>Calories</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
