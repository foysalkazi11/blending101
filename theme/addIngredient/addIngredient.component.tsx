import React from "react";
import styles from "./addIngredient.module.scss";

const AddIngredient = () => {
  const elemList = [
    { ingredient: "beetroot", qty: "2" },
    { ingredient: "guava", qty: "1" },
    { ingredient: "apple", qty: "3" },
  ];
  return (
    <div className={styles.mainContainer}>
      <input
        className={styles.mainContainer__input}
        type="text"
        placeholder="Add Ingredients"
      />
      <div className={styles.mainContainer__card}>
        {elemList.map((itm) => (
          <div key={`${itm}`}>
            <span>{itm.qty}</span>
            <span>{itm.ingredient}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddIngredient;
