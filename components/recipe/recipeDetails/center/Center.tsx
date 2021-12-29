/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Center.module.scss";

const Center = () => {
  return (
    <div>
      <div className={styles.header}>
        <img src="/icons/chart-bar-light-green.svg" alt="bar icon" />
        <h3>Recipe</h3>
      </div>
    </div>
  );
};

export default Center;
