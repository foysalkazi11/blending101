import React from "react";
import CustomAccordion from "../../theme/accordion/accordionCopy.component";

interface recursiveAccordianInterface {
  dataObject: object;
}

const RecursiveAccordian = ({ dataObject }: recursiveAccordianInterface) => {
  dataObject;

  const populateAccordian = (data) => {
    return Object.entries(data).map((entries, index) => {
      // console.log(entries);
      return (
        <div key={`${entries}`}>
          {/* @ts-ignore */}

        </div>
      );
    });
    // return Object.entries(data).map((entries, index) => {
    //   console.log(entries);
    //   return;
    // });
    //
    // console.log(data);
    return <div></div>;
  };

  // dataObject = {
  //   energy: dataObject.energy,
  //   minerals: dataObject.minerals,
  //   vitamins: dataObject.vitamins,
  // };

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
