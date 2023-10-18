import React from "react";
import styles from "./ProgessBar.module.scss";
import { useUser } from "context/AuthProvider";

type ProgessBarProps = {
  steps: number;
};
const ProgessBar = ({ steps = 1 }: ProgessBarProps) => {
  const { name } = useUser();
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.progessBarContainer}>
        <h2>Complete Your Profile</h2>
        <p>Welcome {name}! Complete a quick and easy wizard that helps us personalize your Blending experience.</p>
        <div className={styles.progressbar}>
          <div className={`${styles.step} ${steps >= 1 ? styles.active : ""} ${steps >= 2 ? styles.finish : ""} `}>
            <span className="step_no">1</span>
          </div>
          <div className={`${styles.step} ${steps >= 2 ? styles.active : ""} ${steps >= 3 ? styles.finish : ""}  `}>
            <span className="step_no">2</span>
          </div>
          <div className={`${styles.step} ${steps >= 3 ? styles.active : ""} ${steps >= 4 ? styles.finish : ""}`}>
            <span className="step_no">3</span>
          </div>
          <div className={`${styles.step} ${styles.step_four} ${steps >= 4 ? styles.active : ""}`}>
            <span className="step_no">4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgessBar;
