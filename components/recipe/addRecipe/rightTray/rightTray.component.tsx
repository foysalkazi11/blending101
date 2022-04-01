/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import RightHeader from "../header/right_header/right_header.component";
import styles from "./rightTray.module.scss";
import UpdatedRecursiveAccordian from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";

const RightTray = ({ nutritionData }) => {
  return (
    <div>
      <RightHeader />
      <div className={styles.right}>
        <div className={styles.right__title}>Nutrition</div>
        <div className={styles.right__sub_heading}>Amount Per Servings Calories</div>
        <div className={styles.compoent__box__nutrition}>
          {nutritionData && (
            <UpdatedRecursiveAccordian
              dataObject={nutritionData}
              counter={1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RightTray;
