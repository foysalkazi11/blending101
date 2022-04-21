import React from "react";
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
  const populateAccordianData = (childrenFeild, firstChild) => {
    return (
      childrenFeild &&
      Object?.entries(childrenFeild)?.map((itm, index) => {
        //@ts-ignore
        if (itm[1]?.childs && Object.keys(itm[1]?.childs)?.length > 0) {
          if (firstChild) {
            return (
              <div key={itm[0] + Date.now()}>
                <AccordComponent
                  title={itm[0]}
                  plusMinusIcon={true}
                  //@ts-ignore
                  value={itm[1]?.value}
                  //@ts-ignore
                  unit={itm[1]?.blendNutrientRefference?.units}
                  percentage={20 + "%"}
                  counter={counter}
                  /* @ts-ignore */
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                >
                  {
                    //@ts-ignore
                    populateAccordianData(itm[1]?.childs, false)
                  }
                </AccordComponent>
              </div>
            );
          } else {
            return (
              <div style={{ marginLeft: "18px" }} key={itm[0] + Date.now()}>
                <AccordComponent
                  title={itm[0]}
                  plusMinusIcon={true}
                  //@ts-ignore
                  value={itm[1]?.value}
                  //@ts-ignore
                  unit={itm[1]?.blendNutrientRefference?.units}
                  percentage={20 + "%"}
                  counter={counter}
                  /* @ts-ignore */
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                >
                  {
                    //@ts-ignore
                    populateAccordianData(itm[1]?.childs, false)
                  }
                </AccordComponent>
              </div>
            );
          }
        } else {
          if (firstChild) {
            return (
              <div key={itm[0] + Date.now()}>
                <AccordComponent
                  title={itm[0]}
                  plusMinusIcon={false}
                  //@ts-ignore
                  value={itm[1]?.value}
                  //@ts-ignore
                  unit={itm[1]?.blendNutrientRefference?.units}
                  percentage={20 + "%"}
                  counter={counter}
                  /* @ts-ignore */
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
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
                  /* @ts-ignore */
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                />
              </div>
            );
          }
        }
      })
    );
  };

  return (
    content && (
      <AccordComponent
        title={title}
        type={type}
        counter={counter}
        key={title + Date.now()}
      >
        {populateAccordianData(content, true)}
      </AccordComponent>
    )
  );
};

export default UpdatedCustomAccordion;
