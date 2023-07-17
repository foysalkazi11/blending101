import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { GET_INGREDIENTS_RXFACT } from "../../../../graphql/Ingredients";
import styles from "./Summary.module.scss";

const Summary = ({ ingredients }) => {
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
    return {
      netCarbs: fact?.giGl?.netCarbs.toFixed(1) || 0,
      glycemicLoad: fact?.giGl?.totalGL.toFixed(1) || 0,
      calories:
        fact?.nutrients
          ?.find((nutrient) => nutrient.name === "Calorie")
          ?.value.toFixed(1) || 0,
    };
  }, [data]);

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
