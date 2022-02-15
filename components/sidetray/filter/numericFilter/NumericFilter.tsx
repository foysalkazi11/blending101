import React, { useCallback, useRef, useState } from "react";
import styles from "./NumericFilter.module.scss";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { modifyFilter } from "../../../../redux/slices/filterRecipeSlice";

type NumericFilterProps = {
  childIngredient?: string;
  type?: "counter" | "currency" | "date";
};

const NumericFilter = ({
  childIngredient,
  type = "counter",
}: NumericFilterProps) => {
  const dispatch = useAppDispatch();
  const { pageTitle, expandedMenu, activeTab, value, range } = useAppSelector(
    (state) => state?.filterRecipe?.activeState
  );
  const lessThanRef = useRef<any>(null);
  const greaterThanRef = useRef<any>(null);
  const startFromRef = useRef<any>(null);
  const endToRef = useRef<any>(null);
  const [startCounter, setStartCounter] = useState(0);
  const [endCounter, setEndCounter] = useState(0);
  const [tabValue, setTabValue] = useState(activeTab || "less than");

  const [lessThanInput, setLessThanInput] = useState(0);
  const [greaterThanInput, setGreaterThanInput] = useState(0);
  const [startFormInput, setStartFormInput] = useState(0);
  const [endFormInput, setEndFormInput] = useState(0);

  const handleActiveTab = (value: string) => {
    setTabValue(value);
  };

  const resetInput = useCallback(
    (title: "Less Than" | "Start" | "End" | "Greater Than") => {
      const reset = (ref: any) => {
        if (type === "counter") ref?.current?.reset();
        else ref.current.value = "";
      };
      // prettier-ignore
      if (title === 'Less Than') {
        if (greaterThanRef.current) reset(greaterThanRef)
        if (startFromRef.current) reset(startFromRef)
        if (endToRef.current) reset(endToRef)
      } 
      else if (title === 'Greater Than') {
        if (lessThanRef.current) reset(lessThanRef)
        if (startFromRef.current) reset(startFromRef)
        if (endToRef.current) reset(endToRef)
      }
      else if (title === 'Start' || title === 'End') {
        if (lessThanRef.current) reset(lessThanRef)
        if (greaterThanRef.current) reset(greaterThanRef)
      }
    },
    [type]
  );

  const counterHandler = (
    value: number,
    title: "Less Than" | "Start" | "End" | "Greater Than"
  ) => {
    const titleType = pageTitle;
    let values = "";
    let tabMenu = "";
    let range: [number, number] = [0, 0];

    // prettier-ignore
    if (title === 'Less Than') {
      values = `${titleType} < ${value}`;
      tabMenu = 'less than';
      setLessThanInput(value)
      setGreaterThanInput(0)
      setStartFormInput(0)
      setEndFormInput(0)
    } 
    else if (title === 'Greater Than') {
      values = `${value} > ${titleType}`;
      tabMenu = 'greater than';
      setGreaterThanInput(value)
      setLessThanInput(0)
      setStartFormInput(0)
      setEndFormInput(0)
    } 
    else if (title === 'Start') {
      values = `${value} < ${titleType} < ${endCounter}`;
      tabMenu = 'between';
      range = [value, endCounter]
      setStartCounter(value);
      setStartFormInput(value)
      setGreaterThanInput(0)
      setLessThanInput(0)
      
    }
    else if (title === 'End') {
      values = `${startCounter} < ${titleType} < ${value}`;
      tabMenu = 'between';
      range = [startCounter, value]
      setEndCounter(value);
      setEndFormInput(value)
      setGreaterThanInput(0)
      setLessThanInput(0)
    }
    dispatch(
      modifyFilter({
        pageTitle: pageTitle,
        expandedMenu: expandedMenu || "",
        activeTab: tabMenu,
        values: [values],
        prefix: titleType,
        range: range,
        value: value,
      })
    );
  };

  return (
    <div className={styles.numericFilterContainer}>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.firstChild} ${
            tabValue === "less than" ? styles.active : ""
          }`}
          onClick={() => handleActiveTab("less than")}
        >
          Less than
        </div>
        <div
          className={`${styles.middleChild} ${
            tabValue === "between" ? styles.active : ""
          }`}
          onClick={() => handleActiveTab("between")}
        >
          Between
        </div>
        <div
          className={`${styles.lastChild} ${
            tabValue === "greater than" ? styles.active : ""
          }`}
          onClick={() => handleActiveTab("greater than")}
        >
          Greater than
        </div>
      </div>
      {tabValue === "less than" ? (
        <div className={styles.counterContainer}>
          <div
            className={styles.counterButton}
            onClick={() => {
              if (Number(lessThanInput) >= 1) {
                counterHandler(Number(lessThanInput - 1), "Less Than");
              }
            }}
          >
            <BiMinus />
          </div>
          <input
            className={styles.counterContainerInput}
            min={0}
            type="number"
            value={lessThanInput}
            onChange={(e) =>
              counterHandler(Number(e?.target?.value), "Less Than")
            }
          />
          <div
            className={styles.counterButton}
            onClick={() =>
              counterHandler(Number(lessThanInput + 1), "Less Than")
            }
          >
            <BiPlus />
          </div>
        </div>
      ) : null}
      {tabValue === "between" ? (
        <div className={styles.counterBetween}>
          <div className={styles.counterContainer}>
            <div
              className={styles.counterButton}
              onClick={() => {
                if (Number(startFormInput) >= 1) {
                  counterHandler(Number(startFormInput - 1), "Start");
                }
              }}
            >
              <BiMinus />
            </div>
            <input
              className={styles.counterContainerInput}
              min={0}
              type="number"
              value={startFormInput}
              onChange={(e) =>
                counterHandler(Number(e?.target?.value), "Start")
              }
              style={{ width: "35px" }}
            />
            <div
              className={styles.counterButton}
              onClick={() =>
                counterHandler(Number(startFormInput + 1), "Start")
              }
            >
              <BiPlus />
            </div>
          </div>
          <div className={styles.counterContainer}>
            <div
              className={styles.counterButton}
              onClick={() => {
                if (Number(endFormInput) >= 1) {
                  counterHandler(Number(endFormInput - 1), "End");
                }
              }}
            >
              <BiMinus />
            </div>
            <input
              className={styles.counterContainerInput}
              min={0}
              type="number"
              value={endFormInput}
              onChange={(e) => counterHandler(Number(e?.target?.value), "End")}
              style={{ width: "35px" }}
            />
            <div
              className={styles.counterButton}
              onClick={() => counterHandler(Number(endFormInput + 1), "End")}
            >
              <BiPlus />
            </div>
          </div>
        </div>
      ) : null}

      {tabValue === "greater than" ? (
        <div className={styles.counterContainer}>
          <div
            className={styles.counterButton}
            onClick={() => {
              if (Number(greaterThanInput) >= 1) {
                counterHandler(Number(greaterThanInput - 1), "Greater Than");
              }
            }}
          >
            <BiMinus />
          </div>
          <input
            className={styles.counterContainerInput}
            min={0}
            type="number"
            value={greaterThanInput}
            onChange={(e) =>
              counterHandler(Number(e?.target?.value), "Greater Than")
            }
          />
          <div
            className={styles.counterButton}
            onClick={() =>
              counterHandler(Number(greaterThanInput + 1), "Greater Than")
            }
          >
            <BiPlus />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NumericFilter;
