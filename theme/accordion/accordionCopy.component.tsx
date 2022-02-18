import React, { useEffect, useRef, useState } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./accordion.module.scss";

type CustomAccordionProps = {
  title: string;
  children?: React.ReactNode;
  iconRight?: boolean;
  plusMinusIcon?: boolean;
  dataObject?: object;
};

const CustomAccordion = ({
  title,
  children,
  iconRight = false,
  plusMinusIcon = true,
  dataObject,
}: CustomAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      expanded
        ? (contentRef.current.style.maxHeight = `1000px`)
        : (contentRef.current.style.maxHeight = "0px");
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
          <div className={styles.accordionSummaryForNested}>
            {expanded ? (
              <FiMinusSquare
                className={styles.icon}
                style={!plusMinusIcon && { visibility: "hidden" }}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              />
            ) : (
              <FiPlusSquare
                className={styles.icon}
                style={!plusMinusIcon && { visibility: "hidden" }}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              />
            )}
            <div className={styles.accordianContent}>
              <h5 className={styles.title}>{title}</h5>
              <p className={styles.valueUnit + " " + styles.alignLeft}>
                {dataObject && dataObject[1].value}
              </p>
              <p className={styles.valueUnit + " " + styles.alignLeft}>
                {dataObject && dataObject[1].Unit}
              </p>
            </div>
          </div>
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
