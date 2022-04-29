import React, { useEffect, useState } from "react";
import InputGoal from "../../user/user/personalization/physical/dailyIntake/inputGoal/inputGoal.component";
import AccordianElement from "./accordianElement/accordianElement.component";
import styles from "./dailyIntakeAccordian.module.scss";

interface dailyIntakeAccordian {
  recursiveObject?: object;
  inputValue?: object;
  setInputValue?: any;
}

const DailyIntakeAccordian = ({
  recursiveObject,
  inputValue,
  setInputValue,
}: dailyIntakeAccordian) => {
  return (
    <>
      {recursiveObject &&
        Object?.entries(recursiveObject)?.map((elem) => {
          if (elem[0] !== "Calories") {
            return (
              <AccordianElement
                key={`${elem}`}
                inputValue={inputValue}
                setInputValue={setInputValue}
                title={elem[0]}
                data={elem[1]}
              />
            );
          }
        })}
    </>
  );
};

export default DailyIntakeAccordian;
