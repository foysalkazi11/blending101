import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import styles from "./accordion.module.scss";

type CustomAccordionProps = {
  title: string;
  children: React.ReactNode;
};

const CustomAccordion = ({ title, children }: CustomAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  return (
    <Accordion
      expanded={expanded === true}
      onChange={() => setExpanded(!expanded)}
      className={styles.accordion}
    >
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
      <div className={styles.accordianDetails}>{children}</div>
    </Accordion>
  );
};

export default CustomAccordion;
