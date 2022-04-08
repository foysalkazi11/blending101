import React, { useState } from "react";
import AccordComponent from "./accordComponent.component";

type CustomAccordionProps = {
  title: string;
  content?: any;
  type?: string;
  counter?: number;
};

const UpdatedCustomAccordion = ({
  title,
  content,
  type,
  counter,
}: CustomAccordionProps) => {
  const populateAccordian = (childrenFeild, firstChild) => {
    return Object?.entries(childrenFeild)?.map((itm, index) => {
      //@ts-ignore
      if (itm[1]?.childs) {
        if (firstChild === true) {
          return (
            <div key={itm[0] + Date.now()}>
              <AccordComponent
                title={itm[0]}
                /* @ts-ignore */
                value={itm[1]?.value || "-"}
                /* @ts-ignore */
                unit={itm[1]?.Unit || " "}
                percentage="20%"
                counter={counter}
              >
                {
                  //@ts-ignore
                  populateAccordian(itm[1].childs, false)
                }
              </AccordComponent>
            </div>
          );
        } else {
          return (
            <div style={{ marginLeft: "18px" }} key={itm[0] + Date.now()}>
              {/* @ts-ignore */}
              <AccordComponent
                title={itm[0]}
                /* @ts-ignore */
                value={itm[1]?.value}
                /* @ts-ignore */
                unit={itm[1]?.blendNutrientRefference?.units}
                percentage={20 + "%"}
                counter={counter}
              >
                {
                  //@ts-ignore
                  populateAccordian(itm[1].childs, false)
                }
              </AccordComponent>
            </div>
          );
        }
      } else {
        if (Object.keys(childrenFeild).length - 1 === index) {
          return (
            <div style={{ marginLeft: "18px" }} key={itm[0] + Date.now()}>
              <AccordComponent
                title={itm[0]}
                plusMinusIcon={false}
                //@ts-ignore
                value={itm[1]?.value}
                //@ts-ignore
                unit={itm[1]?.blendNutrientRefference?.units}
                percentage={20 + "%"}
                counter={counter}
                lastElement={true}
              />
            </div>
          );
        } else {
          return (
            <div style={{ marginLeft: "18px" }} key={itm[0] + Date.now()}>
              <AccordComponent
                title={itm[0]}
                plusMinusIcon={false}
                //@ts-ignore
                value={itm[1]?.value}
                //@ts-ignore
                unit={itm[1]?.blendNutrientRefference?.units}
                percentage={20 + "%"}
                counter={counter}
              />
            </div>
          );
        }
      }
    });
  };

  return (
    content && (
      <AccordComponent
        title={title}
        type={type}
        counter={counter}
        key={title + Date.now()}
      >
        {populateAccordian(content, true)}
      </AccordComponent>
    )
  );
};

export default UpdatedCustomAccordion;
