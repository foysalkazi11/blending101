import React, { ReactNode } from "react";
import styles from "./toggleCard.module.scss";

interface ToggleCardInterface {
  toggler?: boolean;
  leftToggleHeading?: string;
  rightToggleHeading?: string;
  headingStyle?: object;
  activeTogglerHeight?: string;
  activeBorderColor?: string;
  nonActiveTogglerHeight?: string;
  nonActiveBorderColor?: string;
  togglerStyle?: object;
  children?: ReactNode;
  setTogglerFunc?: React.Dispatch<React.SetStateAction<boolean>>;
}
const ToggleCard = ({
  toggler,
  leftToggleHeading,
  rightToggleHeading,
  headingStyle,
  activeTogglerHeight,
  activeBorderColor,
  nonActiveTogglerHeight,
  nonActiveBorderColor,
  togglerStyle,
  children,
  setTogglerFunc,
}: ToggleCardInterface) => {
  leftToggleHeading = leftToggleHeading || "";
  rightToggleHeading = rightToggleHeading || "";
  headingStyle = headingStyle || {};
  activeBorderColor = activeBorderColor || "#fd5109";
  nonActiveBorderColor = nonActiveBorderColor || "#eeeeee";
  togglerStyle = togglerStyle || {};
  nonActiveTogglerHeight = nonActiveTogglerHeight || "1px";
  activeTogglerHeight = activeTogglerHeight || "2px";

  const activeToggleBorderStyle = {
    borderBottom: `${activeTogglerHeight} solid ${activeBorderColor}`,
    marginBottom: `-${activeTogglerHeight}`,
    color: "#837f7f",
  };
  const nonActiveToggleBorderStyle = {
    borderBottom: `${nonActiveTogglerHeight} solid ${nonActiveBorderColor}`,
    paddingBottom: `${activeTogglerHeight}`,
    marginBottom: `${activeTogglerHeight}`,
  };

  if (!leftToggleHeading && !rightToggleHeading) return null;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__card}>
        <div
          className={styles.mainContainer__card__toggler}
          style={{ ...togglerStyle, ...nonActiveToggleBorderStyle }}
        >
          <div
            className={styles.mainContainer__card__toggler__left}
            style={{
              ...headingStyle,
              ...(toggler ? activeToggleBorderStyle : {}),
            }}
            onClick={() => setTogglerFunc && setTogglerFunc(true)}
          >
            {leftToggleHeading}
          </div>
          <div
            className={styles.mainContainer__card__toggler__right}
            style={{
              ...headingStyle,
              ...(!toggler ? activeToggleBorderStyle : {}),
            }}
            onClick={() => setTogglerFunc && setTogglerFunc(false)}
          >
            {rightToggleHeading}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ToggleCard;
