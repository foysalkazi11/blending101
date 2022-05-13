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
        [blendNutrientId]: {
          goal: parseInt(e.target.value),
          blendNutrientId: blendNutrientId,
        },
      },
    };
    setInputValue(updatedObject);
  };

  const populateAccordianData = (dataElem) => {
    if (!dataElem) return null;

    return (
      dataElem &&
      Object?.entries(data)?.map((elem, index) => {
        if (elem[1]?.data?.value) {
          return (
            <div
              key={`${elem[1]?.blendNutrientRef}` + `${index}`}
              className={styles.accordianDiv__tray}
            >
              <div className={styles.accordianDiv__tray__left}>
                {elem[1]?.nutrientName}
              </div>
              <div className={styles.accordianDiv__tray__center}>
                {parseFloat(elem[1]?.data?.value).toFixed(0) +
                  " " +
                  elem[1]?.data?.units}
              </div>
              <div className={styles.accordianDiv__tray__right}>
                <span className={styles.accordianDiv__tray__right__icon}>
                  {/* <GiGolfFlag /> */}
                </span>
                <InputGoal
                  name={elem[1]?.nutrientName}
                  inputValue={
                    // @ts-ignore
                    inputValue?.goals?.[elem[1]?.blendNutrientRef]?.goal ||
                    parseFloat(elem[1]?.data?.value).toFixed(0)
                  }
                  // @ts-ignore
                  setInputValue={(e) => handleInput(e, elem[1].blendNutrientRef)}
                />
                <span className={styles.accordianDiv__tray__right__icon}>
                  {/* <FiInfo /> */}
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
        {populateAccordianData(data)}
      </div>
    </div>
  );
};

export default AccordianElement;
