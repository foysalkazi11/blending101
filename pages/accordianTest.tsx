import React from "react";
import CustomAccordion from "../theme/accordion/accordionCopy.component";

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
    Minerals: {
      Calcium: { value: "Calcium, Ca", Unit: "kcal", children: {} },
    },
  };
  const populateAccordian = (data, title) => {
    console.log(data);

    Object.entries(data).map((entries, index) => {
      console.log(entries);
    });
    return (
      <div style={{ marginLeft: "20px" }}>
        <CustomAccordion title={title}>
          <div>
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
      </div>
    );
  };
  return (
    <div>
      {Object.entries(nestedAccordian).map((entries, index) => {
        console.log(entries);
        return (
          <CustomAccordion key={`${entries}`} title={entries[0]}>
            {}
          </CustomAccordion>
        );
      })}
    </div>
  );
};

export default AccordianTest;
