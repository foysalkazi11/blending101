import React from "react";
import styles from "./NumericFilter.module.scss";

const NumericFilter = () => {
  return (
    <div className={styles.numericFilterContainer}>
      <div className={styles.tabContainer}>
        <div className={styles.firstChild}>Less than</div>
        <div className={styles.middleChild}>Between</div>
        <div className={styles.lastChild}>Greater than</div>
      </div>
    </div>
  );
};

export default NumericFilter;
