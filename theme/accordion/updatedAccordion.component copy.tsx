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
    return Object.entries(childrenFeild).map((itm) => {
      //@ts-ignore
      if (Object.keys(itm[1].children).length > 0) {
        if (firstChild === true) {
          return (
            <div>
              {/* @ts-ignore */}
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
                  populateAccordian(itm[1].children, false)
                }
              </AccordComponent>
            </div>
          );
        } else {
          return (
            <div style={{ marginLeft: "18px" }}>
              {/* @ts-ignore */}
              <AccordComponent
                title={itm[0]}
                /* @ts-ignore */
                value={itm[1]?.value}
                /* @ts-ignore */
                unit={itm[1]?.Unit}
                percentage={20 + "%"}
                counter={counter}
              >
                {
                  //@ts-ignore
                  populateAccordian(itm[1].children, false)
                }
              </AccordComponent>
            </div>
          );
        }
      } else {
        //@ts-ignore
        if (itm[1]?.Unit && itm[1]?.value && Number(itm[1].value) > 0) {
          //@ts-ignore

          if (firstChild === true) {
            return (
              //@ts-ignore
              <AccordComponent
                title={itm[0]}
                plusMinusIcon={false}
                //@ts-ignore
                value={itm[1]?.value}
                //@ts-ignore
                unit={itm[1]?.Unit}
                percentage={20 + "%"}
                counter={counter}
              />
            );
          } else {
            return (
              <div style={{ marginLeft: "18px" }}>
                <AccordComponent
                  title={itm[0]}
                  plusMinusIcon={false}
                  //@ts-ignore
                  value={itm[1]?.value}
                  //@ts-ignore
                  unit={itm[1]?.Unit}
                  percentage={20 + "%"}
                  counter={counter}
                />
              </div>
            );
          }
        }
      }
    });
  };

  return (
    content && (
      <AccordComponent title={title} type={type} counter={counter}>
        {populateAccordian(content, true)}
      </AccordComponent>
    )
  );
};

export default UpdatedCustomAccordion;
