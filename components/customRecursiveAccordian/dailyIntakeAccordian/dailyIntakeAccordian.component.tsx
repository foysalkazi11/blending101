import React from "react";
import InputGoal from "../../user/user/personalization/physical/dailyIntake/inputGoal/inputGoal.component";
import AccordianElement from "./accordianElement/accordianElement.component";
import styles from "./dailyIntakeAccordian.module.scss";

interface dailyIntakeAccordian {
  recursiveObject?: object;
}

const DailyIntakeAccordian = ({ recursiveObject }: dailyIntakeAccordian) => {
  console.log(recursiveObject);
  return (
    <>
      {recursiveObject &&
        Object.entries(recursiveObject).map((elem) => {
          if (elem[0] !== "__typename") {
            return <AccordianElement title={elem[0]} data={elem} keyvalue={`${elem}${Math.random()}${Date.now()}`}/>;
          }
        })}
    </>
  );
};

export default DailyIntakeAccordian;
