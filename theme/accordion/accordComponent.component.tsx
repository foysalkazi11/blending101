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

const valueUnitConvertor = (title, value, unit) => {
  let val = parseInt(value);
  let unitVal = unit;

  if (val?.toString()?.length > 2) {
    // console.log({ title: title, value: val, unit: unitVal });
    if (unitVal === `UG`) {
      val = val / 1000;
      unitVal = `MG`;
      valueUnitConvertor(title, val, unitVal);
    } else if (unitVal === `MG`) {
      val = val / 1000;
      unitVal = `MG`;
      valueUnitConvertor(title, val, unitVal);
    } else if (unitVal === `G`) {
      val = val / 1000;
      unitVal = `MG`;
      valueUnitConvertor(title, val, unitVal);
    } else {
      null;
    }
  } else {
    null;
  }
  return { value: val, unit: unitVal };
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

  let valueAndUnit = valueUnitConvertor(title, value, unit);
  useEffect(() => {
    if (contentRef.current) {
      expanded
        ? (contentRef.current.style.maxHeight = `1000px`)
        : (contentRef.current.style.maxHeight = "0px");
    }
  }, [expanded, contentRef]);
  return (
    <div className={styles.accordion}>
      {!type ? (
        <div className={`${styles.accordionSummary}`}>
          {
            //@ts-ignore
            parseFloat(valueAndUnit?.value * counter).toFixed(1) > 0 && (
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
                    {
                      <p className={styles.valueUnit + " " + styles.alignCenter}>
                        {
                          //@ts-ignore
                          parseFloat(valueAndUnit?.value * counter).toFixed(1)
                        }
                        &nbsp;
                        {valueAndUnit?.unit?.toLowerCase()}
                      </p>
                    }
                  </div>

                  <p className={styles.valueUnit + " " + styles.percentage}>{percentage || ""}</p>
                </div>
              </div>
            )
          }
        </div>
      ) : (
        <div className={`${styles.accordionSummary}`}>
          <div className={styles.accordianMainHeading}>
            {expanded ? (
              <FiMinusSquare
                className={styles.icon + " " + styles.iconCopy}
                style={!plusMinusIcon && { visibility: "hidden" }}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              />
            ) : (
              <FiPlusSquare
                className={styles.icon + " " + styles.iconCopy}
                style={!plusMinusIcon && { visibility: "hidden" }}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              />
            )}
            <div className={styles.accordianContent}>
              <h5 className={styles.titleAccordianMainHeading}>{title}</h5>
              {value && unit && (
                <p className={styles.valueUnit + " " + styles.alignLeft}>
                  {/* {parseFloat(value).toFixed(1)} &nbsp; {unit} */}
                </p>
              )}
              <p className={styles.valueUnit + " " + styles.percentage}>{percentage || ""}</p>
            </div>
          </div>
        </div>
      )}
      <div className={styles.accordianDetails} ref={contentRef as React.RefObject<HTMLDivElement>}>
        {children}
      </div>
    </div>
  );
};

export default AccordComponent;
