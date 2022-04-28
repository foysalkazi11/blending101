import React from "react";
import AccordComponent from "./accordComponent.component";

type CustomAccordionProps = {
  title: string;
  content?: any;
  type?: string;
  counter?: number;
  dailyGoalsData: string;
};

const UpdatedCustomAccordion = ({
  title,
  content,
  type,
  counter,
  dailyGoalsData,
}: CustomAccordionProps) => {
  if (dailyGoalsData) {
    dailyGoalsData = JSON?.parse(dailyGoalsData) || {};
  }

  const populateAccordianData = (childrenFeild, firstChild) => {
    return (
      childrenFeild &&
      Object?.entries(childrenFeild)?.map((itm, index) => {
        //@ts-ignore
        const dailyDosePercentage =
          //@ts-ignore
          itm[1]?.blendNutrientRefference?._id &&
          dailyGoalsData &&
          //@ts-ignore
          dailyGoalsData?.[itm[1]?.blendNutrientRefference?._id];

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
                  percentage={
                    dailyDosePercentage
                      ? `${parseFloat(
                          //@ts-ignore
                          100 * (itm[1]?.value / dailyDosePercentage?.goal)
                        ).toFixed(2)} %`
                      : ""
                  }
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
                  percentage={
                    dailyDosePercentage
                      ? `${parseFloat(
                          //@ts-ignore
                          100 * (itm[1]?.value / dailyDosePercentage?.goal)
                        ).toFixed(2)} %`
                      : ""
                  }
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
                  percentage={
                    dailyDosePercentage
                      ? `${parseFloat(
                          //@ts-ignore
                          (itm[1]?.value / dailyDosePercentage?.goal) * 100
                        ).toFixed(2)} %`
                      : ""
                  }
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
                  percentage={
                    dailyDosePercentage
                      ? `${parseFloat(
                          //@ts-ignore
                          100 * (itm[1]?.value / dailyDosePercentage?.goal)
                        ).toFixed(2)} %`
                      : ""
                  }
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
  //@ts-ignore
  console.log(dailyGoalsData, "asdfasfdj");
  console.log({ content });
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
