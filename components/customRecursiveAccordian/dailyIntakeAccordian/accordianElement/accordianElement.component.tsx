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
    blendNutrientId: string,
    dri: number,
  ) => {
    let updatedObject = inputValue;
    updatedObject = {
      ...updatedObject,
      goals: {
        // @ts-ignore
        ...updatedObject.goals,
        [blendNutrientId]: {
          goal: parseInt(e.target.value),
          blendNutrientId,
          dri,
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
        const mainData = elem[1];
        if (mainData?.data?.value) {
          return (
            <div
              key={`${mainData?.blendNutrientRef}` + `${index}`}
              className={styles.accordianDiv__tray}
            >
              <div className={styles.accordianDiv__tray__left}>
                {mainData?.nutrientName}
              </div>
              {title === "Macros" ? (
                <div className={styles.accordianDiv__tray__centerGrid}>
                  {mainData?.showPercentage ? (
                    <div className={styles.leftSide}>
                      <InputGoal inputValue={mainData?.percentage} />%
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div>
                    {`${parseFloat(mainData?.data?.value).toFixed(
                      0,
                    )}${mainData?.data?.units?.toLowerCase()} `}
                  </div>
                </div>
              ) : (
                <div className={styles.accordianDiv__tray__center}>
                  {`${parseFloat(mainData?.data?.value).toFixed(
                    0,
                  )}${mainData?.data?.units?.toLowerCase()} `}
                </div>
              )}

              <div className={styles.accordianDiv__tray__right}>
                <span className={styles.accordianDiv__tray__right__icon}>
                  {/* <GiGolfFlag /> */}
                </span>
                <InputGoal
                  name={mainData?.nutrientName}
                  inputValue={
                    // @ts-ignore
                    inputValue?.goals?.[mainData?.blendNutrientRef]?.goal
                    // parseFloat(mainData?.data?.value).toFixed(0)
                  }
                  // @ts-ignore
                  setInputValue={(e) =>
                    handleInput(
                      e,
                      mainData.blendNutrientRef,
                      parseFloat(mainData?.data?.value),
                    )
                  }
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
    <>
      <div className={styles.centerElement}>
        <div
          className={styles.centerElement__icon}
          onClick={handleAccordianClick}
        >
          {collapseAccordian ? "-" : "+"}
        </div>
        <h3 className={styles.centerElement__mainHeading}>{title}</h3>
      </div>
      <div className={styles.accordianDiv} ref={accordianRef}>
        {populateAccordianData(data)}
      </div>
    </>
  );
};

export default AccordianElement;
