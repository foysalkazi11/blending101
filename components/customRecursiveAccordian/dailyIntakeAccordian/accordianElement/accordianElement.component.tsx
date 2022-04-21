import React, { useEffect, useRef, useState } from "react";
import InputGoal from "../../../user/user/personalization/physical/dailyIntake/inputGoal/inputGoal.component";
import styles from "./accordianElement.module.scss";
import { FiInfo } from "react-icons/fi";
import { GiGolfFlag } from "react-icons/gi";

const AccordianElement = ({ title, data, inputValue, setInputValue }) => {
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

  return (
    <div>
      <div className={styles.centerElement}>
        <div className={styles.centerElement__icon} onClick={handleAccordianClick}>
          {collapseAccordian ? "-" : "+"}
        </div>
        <h3 className={styles.centerElement__mainHeading}>{title}</h3>
      </div>
      <div className={styles.accordianDiv} ref={accordianRef}>
        {data[1]?.map((elem) => {
          return (
            <div
              key={`${elem.blendNutrientRef}`}
              className={styles.accordianDiv__tray}
            >
              <div className={styles.accordianDiv__tray__left}>
                {elem?.nutrientName}
              </div>
              <div className={styles.accordianDiv__tray__center}>
                {parseFloat(elem?.data?.value).toFixed(2) + " " + elem?.data?.units}
              </div>
              <div className={styles.accordianDiv__tray__right}>
                <span className={styles.accordianDiv__tray__right__icon}>
                  <GiGolfFlag />
                </span>
                <InputGoal
                  name={elem?.nutrientName}
                  inputValue={inputValue?.goals?.[elem?.nutrientName]?.goal || ""}
                  setInputValue={(e) => handleInput(e, elem.blendNutrientRef)}
                />
                <span className={styles.accordianDiv__tray__right__icon}>
                  <FiInfo />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccordianElement;
