/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import styles from "./tray.module.scss";
import { categories } from "../variables";

const TrayEdit = ({ ingredients }) => {
  const [category, setCategory] = useState(categories[0].val);
  const { data } = useQuery(FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS, {
    variables: {
      data: {
        ingredientCategory: category,
        IngredientClass: 1,
      },
    },
  });

  let allIngredients = data?.filterIngredientByCategoryAndClass;

  console.log(ingredients);

  useEffect(() => {
    if (!ingredients || !allIngredients) return;
    const presentIngredients = allIngredients.filter((item) => {
      const itemMatch = ingredients.filter((ing) => {
        return item._id === ing.ingredientId._id;
      });
      if (itemMatch.length) return itemMatch[0];
    });
    console.log(presentIngredients);
  }, [ingredients, allIngredients]);

  if (!data) return null;
  return (
    <div className={styles.bar}>
      <div className={styles.bar__inner}>
        <ul>
          {data?.filterIngredientByCategoryAndClass.map((ingredient, i) => (
            <li key={ingredient._id}>{ingredient.ingredientName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrayEdit;
