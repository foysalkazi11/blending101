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
              <AccordComponent title={itm[0]} value="3" unit="Mg" percentage="20%">
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
              <AccordComponent title={itm[0]} value={itm[1].value} unit={itm[1].Unit} percentage={20 + "%"}>
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
        if (itm[1].Unit && itm[1].value && Number(itm[1].value) > 0) {
          //@ts-ignore

          if (firstChild === true) {
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
          }else{
            return(
              <div style={{marginLeft:"18px"}}>
              <AccordComponent
                title={itm[0]}
                plusMinusIcon={false}
                //@ts-ignore
                value={itm[1].value}
                //@ts-ignore
                unit={itm[1].Unit}
                percentage={20 + "%"}
              />
            </div>
            )
          }
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
