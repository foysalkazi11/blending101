import React from "react";
import AccordComponent from "./accordComponent.component";

type CustomAccordionProps = {
  title: string;
  content?: any;
  type?: string;
  counter?: number;
  dailyGoalsData: string;
  servingSize?: number;
  sinngleIngQuintity?: number;
};

const UpdatedCustomAccordion = ({
  title,
  content,
  type,
  counter = 1,
  dailyGoalsData,
  servingSize = 1,
  sinngleIngQuintity = 1,
}: CustomAccordionProps) => {
  if (dailyGoalsData) {
    dailyGoalsData = JSON?.parse(dailyGoalsData) || {};
  }

  const calculateDailyPercentage = (
    recipeNutrientValue: number,
    dailyGoals: number,
  ) => {
    return Math?.round(
      ((100 / dailyGoals) *
        recipeNutrientValue *
        counter *
        sinngleIngQuintity) /
        servingSize,
    );
  };

  const populateAccordianData = (childrenFeild, firstChild) => {
    return (
      childrenFeild &&
      Object?.entries(childrenFeild)?.map((itm, index) => {
        //@ts-ignore
        const dailyDosePercentage =
          //@ts-ignore
          dailyGoalsData?.[itm[1]?.blendNutrientRefference?._id];

        //@ts-ignore
        const dailyGoals = dailyDosePercentage?.goal
          ? //@ts-ignore
            parseFloat(dailyDosePercentage?.goal)
          : //@ts-ignore
            parseFloat(dailyDosePercentage?.dri);

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
                      ? `${calculateDailyPercentage(
                          //@ts-ignore
                          parseFloat(itm[1]?.value),
                          dailyGoals,
                        )}%`
                      : ""
                  }
                  counter={counter}
                  sinngleIngQuintity={sinngleIngQuintity}
                  /* @ts-ignore */
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                  servingSize={servingSize}
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
                  //@ts-ignore
                  percentage={
                    dailyDosePercentage
                      ? `${calculateDailyPercentage(
                          //@ts-ignore
                          parseFloat(itm[1]?.value),
                          dailyGoals,
                        )}%`
                      : ""
                  }
                  counter={counter}
                  sinngleIngQuintity={sinngleIngQuintity}
                  /* @ts-ignore */
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                  servingSize={servingSize}
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
                  //@ts-ignore
                  percentage={
                    dailyDosePercentage
                      ? `${calculateDailyPercentage(
                          //@ts-ignore
                          parseFloat(itm[1]?.value),
                          dailyGoals,
                        )}%`
                      : ""
                  }
                  counter={counter}
                  sinngleIngQuintity={sinngleIngQuintity}
                  /* @ts-ignore */
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                  servingSize={servingSize}
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
                  //@ts-ignore
                  percentage={
                    dailyDosePercentage
                      ? `${calculateDailyPercentage(
                          //@ts-ignore
                          parseFloat(itm[1]?.value),
                          dailyGoals,
                        )}%`
                      : ""
                  }
                  counter={counter}
                  sinngleIngQuintity={sinngleIngQuintity}
                  /* @ts-ignore */
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                  servingSize={servingSize}
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
        servingSize={servingSize}
        sinngleIngQuintity={sinngleIngQuintity}
      >
        {populateAccordianData(content, true)}
      </AccordComponent>
    )
  );
};

export default UpdatedCustomAccordion;
