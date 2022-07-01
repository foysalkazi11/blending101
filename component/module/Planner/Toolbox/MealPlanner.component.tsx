import { ReactNode } from "react";
import styles from "./MealPlanner.module.scss";

interface MealPlannerInterface {
  headerComponent?: ReactNode;
  children?: ReactNode;
  sharedStyle?: object;
}
const MealPlanner = ({
  headerComponent,
  children,
  sharedStyle,
}: MealPlannerInterface) => {
  sharedStyle = sharedStyle || {};
  return (
    <div>
      <div className={styles.mainContainer__header} style={sharedStyle}>
        {headerComponent}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MealPlanner;
