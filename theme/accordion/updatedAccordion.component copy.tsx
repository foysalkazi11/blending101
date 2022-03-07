import React, { useState } from "react";
import AccordComponent from "./accordComponent.component";

type CustomAccordionProps = {
  title: string;
  content?: any;
  type?: string;
};

const UpdatedCustomAccordion = ({ title, content, type }: CustomAccordionProps) => {
  const populateAccordian = (childrenFeild, firstChild) => {
    return Object.entries(childrenFeild).map((itm) => {
      //@ts-ignore
      if (Object.keys(itm[1].children).length > 0) {
        if (firstChild === true) {
          return (
            <div>
              {/* @ts-ignore */}
              <AccordComponent title={itm[0]}>
                {
                  //@ts-ignore
                  populateAccordian(itm[1].children, false)
                }
              </AccordComponent>
            </div>
          );
        } else {
          return (
            <div style={{ marginLeft: "28px" }}>
              {/* @ts-ignore */}
              <AccordComponent title={itm[0]}>
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
        if (itm[1].Unit && itm[1].value) {
          //@ts-ignore
          return (
            //@ts-ignore
            <AccordComponent
              title={itm[0]}
              plusMinusIcon={false}
              //@ts-ignore
              value={itm[1].value}
              //@ts-ignore
              unit={itm[1].Unit}
              percentage={20 + "%"}
            />
          );
        }
      }
    });
  };

  return (
    content && (
      <AccordComponent title={title} type={type}>
        {populateAccordian(content, true)}
      </AccordComponent>
    )
  );
};

export default UpdatedCustomAccordion;
