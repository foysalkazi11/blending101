import React, { useState } from "react";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import styles from "./calcium.module.scss";

interface calciumStyle{
    style:any,
}
const CalciumSearchElem = () => {
  const [sortState, curSortState] = useState(true);
  const SortingOrder = () => {
    curSortState(!sortState);
    return sortState;
  };

  return (
    <div className={styles.calciumMg}>
      <div className={styles.calciumText}>
        <div>
          <input type="text" placeholder="Calcium (mg)" />
        </div>
      </div>
      <div className={styles.calciumIcon}>
        <div>
          {sortState ? (
            <span>
              <FaSortAmountDown onClick={SortingOrder} />
            </span>
          ) : (
            <span>
              <FaSortAmountDownAlt onClick={SortingOrder} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalciumSearchElem;
