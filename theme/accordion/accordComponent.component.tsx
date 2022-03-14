import React, { useEffect, useRef, useState } from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import styles from "./updatedAccordion.module.scss";

type CustomAccordionProps = {
  title: string;
  type?: string;
  content?: any;
  children?: React.ReactNode;
  iconRight?: boolean;
  plusMinusIcon?: boolean;
  dataObject?: object;
  value?: string;
  percentage?: string;
  unit?: string;
  counter?: number;
};

const AccordComponent = ({
  title,
  type,
  content,
  children,
  iconRight = false,
  plusMinusIcon = true,
  value,
  percentage,
  unit,
  counter,
}: CustomAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);
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
      <div className={`${styles.accordionSummary}`}>
        <div className={styles.accordionSummaryForNested}>
          {expanded ? (
            <BsPlus
              className={styles.icon + " " + styles.iconCopy}
              style={!plusMinusIcon && { visibility: "hidden" }}
              onClick={() => {
                setExpanded(!expanded);
              }}
            />
          ) : (
            <BiMinus
              className={styles.icon + " " + styles.iconCopy}
              style={!plusMinusIcon && { visibility: "hidden" }}
              onClick={() => {
                setExpanded(!expanded);
              }}
            />
          )}
          <div className={styles.accordianContent}>
            <div
              className={
                value && unit
                  ? styles.accordianContent__whiteCard
                  : styles.accordianContent__whiteCard_conditionalSubheading
              }
            >
              <h5 className={styles.titleCopy}>{title}</h5>
              {value && unit && (
                <p className={styles.valueUnit + " " + styles.alignCenter}>
                  {
                    //@ts-ignore
                    parseFloat(value * parseInt(counter)).toFixed(1)
                  }
                  &nbsp;
                  {unit.toLowerCase()}
                </p>
              )}
            </div>

            <p className={styles.valueUnit + " " + styles.percentage}>
              {percentage || ""}
            </p>
          </div>
        </div>
      </div>

      <div
        className={styles.accordianDetails}
        ref={contentRef as React.RefObject<HTMLDivElement>}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordComponent;
