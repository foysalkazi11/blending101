import React, { useEffect, useRef, useState } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./accordion.module.scss";

type CustomAccordionProps = {
  title: string;
  children: React.ReactNode;
  iconRight?: boolean;
};

const CustomAccordion = ({
  title,
  children,
  iconRight = false,
}: CustomAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = expanded
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [expanded, contentRef]);

  return (
    <div className={styles.accordion}>
      {iconRight ? (
        <div className={`${styles.accordionSummaryForRightIcon}`}>
          <div
            className={`${styles.iconRight} ${expanded ? styles.active : ""}`}
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <h5 className={styles.title}>{title}</h5>

            <IoIosArrowForward className={styles.arrowIcon} />
          </div>
        </div>
      ) : (
        <div className={`${styles.accordionSummary}`}>
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
      )}
      <div
        className={styles.accordianDetails}
        ref={contentRef as React.RefObject<HTMLDivElement>}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomAccordion;
