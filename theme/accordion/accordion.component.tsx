import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
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
      sx={{
        boxShadow: "none",
        "&.MuiAccordion-root:before": {
          height: "0px !important",
        },
        "& .MuiAccordionSummary-root.Mui-expanded": {
          minHeight: "0px !important",
        },
        "& .MuiAccordionSummary-content.Mui-expanded": {
          margin: "10px 0px !important",
        },
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
          transform: "rotate(0deg)",
        },
        "& .MuiAccordionDetails-root": {
          padding: " 0px",
        },
        "& .MuiAccordionSummary-root": {
          padding: "0px !important",
        },
      }}
    >
      <AccordionSummary
        sx={{
          flexDirection: "row-reverse",
        }}
        expandIcon={
          expanded ? (
            <FiMinusSquare className={styles.icon} />
          ) : (
            <FiPlusSquare className={styles.icon} />
          )
        }
      >
        <h5 className={styles.title}>{title}</h5>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
