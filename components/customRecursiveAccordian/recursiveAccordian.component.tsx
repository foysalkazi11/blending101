import React from "react";
import CustomAccordion from "../../theme/accordion/accordionCopy.component";
import styles from "./recursiveAccordian.module.scss";

interface recursiveAccordianInterface {
  dataObject: object;
}

const RecursiveAccordian = ({ dataObject }: recursiveAccordianInterface) => {
  dataObject;

  const populateAccordian = (data) => {
    return Object.entries(data).map((entries, index) => {
      console.log(entries);
      return (
        <div key={`${entries}`}>
          {/* @ts-ignore */}
          {Object.keys(entries[1].children).length !== 0 ? (
            <CustomAccordion title={entries[0]} dataObject={entries}>
              {/* @ts-ignore */}
              {[populateAccordian(entries[1]?.children)]}
            </CustomAccordion>
          ) : (
            <CustomAccordion
              title={entries[0]}
              iconRight={false}
              plusMinusIcon={false}
              dataObject={entries}
            />
          )}
        </div>
      );
    });
  };
  return (
    <div>
      {Object.entries(dataObject).map((entries, index) => {
        return (
          <CustomAccordion key={`${entries}`} title={entries[0]}>
            {populateAccordian(entries[1])}
          </CustomAccordion>
        );
      })}
    </div>
  );
};
export default RecursiveAccordian;
