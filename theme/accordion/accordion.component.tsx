import React, { useState } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import styles from "./accordion.module.scss";

type CustomAccordionProps = {
  title: string;
  children: React.ReactNode;
};

const CustomAccordion = ({ title, children }: CustomAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  return (
    <div className={styles.accordion}>
      <div className={styles.accordionSummary}>
        {expanded ? (
          <FiMinusSquare
            className={styles.icon}
            onClick={() => {
              setExpanded(!expanded);
            }}
          />
        ) : (
          <FiPlusSquare
            className={styles.icon}
            onClick={() => {
              setExpanded(!expanded);
            }}
          />
        )}

        <h5 className={styles.title}>{title}</h5>
      </div>
      <div
        className={
          expanded
            ? styles.accordianDetails + " " + styles.accordianDetails__active
            : styles.accordianDetails
        }
      >
        {children}
      </div>
    </div>
  );
};

export default CustomAccordion;
