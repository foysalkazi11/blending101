import React from "react";
import styles from "./Goals.module.scss";

type GoalsProps = {
  title: string;
  list: { id: number; label: string }[];
  updateUserProfile: Function;
  fieldName: string;
  alredyExistGoals: (id: number) => boolean;
};

const Goals = ({
  list,
  title,
  fieldName,
  updateUserProfile,
  alredyExistGoals,
}: GoalsProps) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.container__goalsContainer}>
        {list?.map((item, index) => {
          const ckeckGoals = alredyExistGoals(item?.id);
          return (
            <span
              key={index}
              className={`${styles.container__goalsContainer__label} ${
                ckeckGoals ? styles.selected : ""
              }`}
              onClick={() => updateUserProfile(fieldName, item)}
            >
              {item?.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;
