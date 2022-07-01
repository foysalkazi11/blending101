import React, { ReactNode } from "react";
import styles from "./MealPlanner.module.scss";

interface MealPlannerInterface {
  headerComponent?: ReactNode;
  children?: ReactNode;
}
const MealPlanner = ({ headerComponent, children }: MealPlannerInterface) => {
  return (
    <div>
      <div className={styles.mainContainer__header}>{headerComponent}</div>
      <div>{children}</div>
    </div>
  );
};

export default MealPlanner;
