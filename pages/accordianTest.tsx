import React from "react";
import CustomAccordion from "../theme/accordion/accordion.component";

const AccordianTest = () => {
  let nestedAccordian = {
    Energy: {
      Protein: {
        value: "energy 1",
        Unit: "kcal",
        children: {},
      },
      Fats: {
        value: "Fats",
        Unit: "fat",
        children: {},
      },
      Carbohydrates: {
        value: "Carbohydrates",
        Unit: "kcal",
        children: {
          "Dietary Fiber": {
            value: "Carbohydrates",
            Unit: "kcal",
            children: {},
          },
          Sugars: {
            value: "Carbohydrates",
            Unit: "kcal",
            children: {
              Sucrose: {
                value: "Sucrose",
                Unit: "kcal",
                children: {},
              },
              Glucose: {
                value: "Glucose",
                Unit: "kcal",
                children: {},
              },
              Fructose: {
                value: "Fructose",
                Unit: "kcal",
                children: {},
              },
              Lactose: {
                value: "Lactose",
                Unit: "kcal",
                children: {},
              },
              Maltose: {
                value: "Maltose",
                Unit: "kcal",
                children: {},
              },
              Galactose: {
                value: "Galactose",
                Unit: "kcal",
                children: {},
              },
            },
          },
          Starch: {
            value: "Starch",
            Unit: "kcal",
            children: {},
          },
        },
      },
    },
    Vitamins: {
      "Vitamin C": {
        value: "Vitamin C",
        Unit: "kcal",
        children: {},
      },
      Thiamin: {
        value: "Thiamin",
        Unit: "kcal",
        children: {},
      },
      Riboflavin: {
        value: "Riboflavin",
        Unit: "kcal",
        children: {},
      },
      Niacin: {
        value: "Niacin",
        Unit: "kcal",
        children: {},
      },
      "Pantothenic acid": {
        value: "Pantothenic acid",
        Unit: "kcal",
        children: {},
      },
    },
    Minerals: "sdf",
  };
  const populateAccordian = (data) => {};
  return (
    <div>
      {Object.entries(nestedAccordian).map((entries) => {
        console.log(entries);
        return (
          <CustomAccordion key={`${entries}`} title={entries[0]}>
            <CustomAccordion key={`${entries}`} title={entries[0]}>
              <div style={{ marginLeft: "20px" }}>
                <div>dfsaf</div>
                <div>dfsaf</div>
                <div>dfsaf</div>
                <div>dfsaf</div>
                <div>dfsaf</div>
                <div>dfsaf</div>
                <div>dfsaf</div>
                <div>dfsaf</div>
                <div>dfsaf</div>
              </div>
            </CustomAccordion>
          </CustomAccordion>
        );
      })}
    </div>
  );
};

export default AccordianTest;
