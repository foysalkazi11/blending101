/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../filter.module.scss";
import Ingredients from "../ingredients/Ingredients.component";
import BlendType from "../blendType/BlendType";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setIngredients } from "../../../../redux/slices/sideTraySlice";

const VisualSection = () => {
  const { ingredients: ingredientsList } = useAppSelector(
    (state) => state?.sideTray,
  );
  const dispatch = useAppDispatch();

  const handleIngredientClick = (item: any, exist: boolean) => {
    let arr = [];

    if (!exist) {
      arr = [
        ...ingredientsList,
        {
          title: item?.ingredientName,
          img: item?.featuredImage || "/food/chard.png",
          id: item?._id,
        },
      ];
    } else {
      arr = ingredientsList.filter((item) => {
        return item?.id !== item?._id;
      });
    }
    dispatch(setIngredients(arr));
  };

  const checkActiveIngredient = (id: string) => {
    let present = false;
    ingredientsList.forEach((item) => {
      if (item.id === id) {
        present = true;
      }
    });
    return present;
  };

  return (
    <div className={styles.filter}>
      <BlendType />
      <Ingredients
        checkActiveIngredient={checkActiveIngredient}
        handleIngredientClick={handleIngredientClick}
      />
    </div>
  );
};

export default VisualSection;
