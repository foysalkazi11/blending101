import React, { useEffect, useRef, useState } from "react";
import InputGoal from "../../../user/user/personalization/physical/dailyIntake/inputGoal/inputGoal.component";
import styles from "./accordianElement.module.scss";
import { FiInfo } from "react-icons/fi";
import { GiGolfFlag } from "react-icons/gi";

interface AccordianElementInterface {
  title?: string;
  data: object;
  inputValue?: object;
  setInputValue?: any;
  children?: any;
}
const AccordianElement = ({
  title,
  data,
  inputValue,
  setInputValue,
  children,
}: AccordianElementInterface) => {
  const [collapseAccordian, setCollapseAccordian] = useState(true);

  const accordianRef = useRef();
  const handleAccordianClick = () => {
    setCollapseAccordian(!collapseAccordian);
  };

  useEffect(() => {
    if (collapseAccordian === false) {
      //@ts-ignore
      accordianRef.current.style.maxHeight = "0px";
    } else {
      //@ts-ignore
      accordianRef.current.style.maxHeight =
        //@ts-ignore
        accordianRef.current.scrollHeight + "px";
    }
  }, [collapseAccordian]);

  const handleInput = (
    e: { target: { name: string; value: string } },
    blendNutrientId: string
  ) => {
    let updatedObject = inputValue;
    updatedObject = {
      ...updatedObject,
      goals: {
        // @ts-ignore
        ...updatedObject.goals,
        [e.target.name]: {
          goal: parseInt(e.target.value),
          blendNutrientId: blendNutrientId,
        },
      },
    };
    setInputValue(updatedObject);
  };

  useEffect(() => {
    if (Object.keys(inputValue).length > 0) {
      console.log(inputValue);
    }
  }, [inputValue]);

  const populateAccordianData = (dataElem) => {
    if (!dataElem) return null;

    return (
      dataElem &&
      Object?.entries(data)?.map((elem) => {
        //@ts-ignore
        if (elem[1]?.active === true) {
          console.log(elem[0]);
          console.log(elem[1]);
          return (
            <div
              // @ts-ignore
              key={`${elem[1]?.blendNutrientRef}`}
              className={styles.accordianDiv__tray}
            >
              <div className={styles.accordianDiv__tray__left}>
                {/* @ts-ignore */}
                {elem[1]?.nutrientName}
              </div>
              <div className={styles.accordianDiv__tray__center}>
                {/* @ts-ignore */}
                {parseFloat(elem[1]?.data?.value).toFixed(0) +
                  " " +
                  // @ts-ignore
                  elem[1]?.data?.units}
              </div>
              <div className={styles.accordianDiv__tray__right}>
                <span className={styles.accordianDiv__tray__right__icon}>
                  {/* <GiGolfFlag /> */}
                </span>
                <InputGoal
                  // @ts-ignore
                  name={elem[1]?.nutrientName}
                  inputValue={
                    // @ts-ignore
                    inputValue?.goals?.[elem[1]?.nutrientName]?.goal || ""
                  }
                  // @ts-ignore
                  setInputValue={(e) => handleInput(e, elem[1].blendNutrientRef)}
                />
                <span className={styles.accordianDiv__tray__right__icon}>
                  <FiInfo />
                </span>
              </div>
            </div>
          );
        }
      })
    );
  };

  return (
    <div>
      <div className={styles.centerElement}>
        <div className={styles.centerElement__icon} onClick={handleAccordianClick}>
          {collapseAccordian ? "-" : "+"}
        </div>
        <h3 className={styles.centerElement__mainHeading}>{title}</h3>
      </div>
      <div className={styles.accordianDiv} ref={accordianRef}>
        {populateAccordianData (data)}
      </div>
    </div>
  );
};

export default AccordianElement;
