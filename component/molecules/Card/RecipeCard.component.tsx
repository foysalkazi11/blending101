import React, { Children, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./RecipeCard.module.scss";
import { IngredientWithPortion } from "@/app/types/ingredient.types";

interface RecipeProps {
  title?: string;
  ingredients?: IngredientWithPortion[];
  category?: string;
  ratings?: number;
  noOfRatings?: number;
  carbs?: number;
  score?: number;
  calorie?: number;
  noOfComments?: number;
  image?: string;
  recipeId?: string;
  notes?: number;
  className?: string;
  children?: React.ReactNode;
  variant?: "border" | "shadow";
}

const RecipeCard: React.FC<RecipeProps> = (props) => {
  const {
    title,
    ingredients,
    category,
    ratings,
    noOfRatings,
    carbs,
    score,
    calorie,
    image,
    recipeId,
    children,
    className,
    variant,
  } = props;
  const menu = useRef<any>();
  const router = useRouter();

  return (
    <div className={`${styles.datacard} ${className} ${styles[variant]}`}>
      <div>
        <div>
          <div className={styles.datacard__body__top}>
            <div>
              <h2 className={styles.title} onClick={() => router.push(`/recipe/recipe_details/${recipeId}`)}>
                {title}
              </h2>
            </div>
            <div className={styles.datacard__body__top__menu} />
          </div>
          <div className={styles.datacard__body__middle}>
            <div className={styles.datacard__body__middle__left}>
              <div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
            </div>
            <div className={styles.datacard__body__middle__right}>
              <div>
                <div className={styles.databody__top}>
                  <div className={styles.databody__top__label}>
                    <div className={styles.category}>{category}</div>
                  </div>
                  <div className={styles.databody__top__info}>
                    {noOfRatings ? (
                      <>
                        <img src="/icons/star.svg" alt="star" />
                        <span>{ratings}</span>&nbsp;
                        <span>({noOfRatings})</span>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className={styles.databody__bottom}>
                  <p>
                    {ingredients?.map(
                      (ing, idx) => `${ing?.ingredientId?.ingredientName}${idx + 1 == ingredients.length ? "" : ", "}`,
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.datacard__body__belt}>
            <div className={styles.datacard__body__belt__child}>
              Net Carbs <span>{Math.round(carbs)}</span>
            </div>
            <div className={styles.datacard__body__belt__child}>
              Rx Score <span>{Math.round(score)}</span>
            </div>
            <div className={styles.datacard__body__belt__child}>
              Calorie <span>{Math.round(calorie)}</span>
            </div>
          </div>
          <div className={styles.datacard__body__bottom}>
            <div className={styles.datacard__body__bottom__left}>
              <img src="/icons/delish.png" alt="brand" />
            </div>
            <div className={styles.datacard__body__bottom__right}>
              <ul>
                {Children.map(children, (child) => (
                  <li>{child}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeCard.defaultProps = {
  title: "Triple Berry Smoothie",
  ingredients: [],
  category: "Uncategorized",
  noOfRatings: 10,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: "/cards/juice.png",
  ratings: 4.5,
  variant: "shadow",
};
export default RecipeCard;
