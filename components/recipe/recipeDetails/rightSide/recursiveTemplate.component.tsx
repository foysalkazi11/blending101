export const recursiveData = ({ energy, vitamins, minerals }) => {
  return {
    Energy: {
      Protein: {
        value: energy?.childs?.proteins?.value,
        Unit: energy?.childs?.proteins?.blendNutrientRefference?.unitName,
        children: {},
      },
      Fats: {
        value: energy?.childs?.fats?.value,
        Unit: energy?.childs?.fats?.blendNutrientRefference?.unitName,
        children: {},
      },
      Carbohydrates: {
        value: energy?.childs?.carbohydrates?.value,
        Unit: energy?.childs?.carbohydrates?.blendNutrientRefference?.unitName,
        children: {
          "Dietary Fiber": {
            value: energy?.childs?.carbohydrates?.dietryFibre?.value,
            Unit: energy?.childs?.carbohydrates?.dietryFibre
              .blendNutrientRefference?.unitName,
            children: {},
          },
          Sugars: {
            value: energy?.childs?.carbohydrates?.sugars?.value,
            Unit: energy?.childs?.carbohydrates?.sugars?.blendNutrientRefference
              ?.unitName,
            children: {
              Sucrose: {
                value:
                  energy?.childs?.carbohydrates?.sugars?.childs?.sucrose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.sucrose
                  ?.blendNutrientRefference?.unitName,
                children: {},
              },
              Glucose: {
                value:
                  energy?.childs?.carbohydrates?.sugars?.childs?.glucose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.glucose
                  ?.blendNutrientRefference?.unitName,
                children: {},
              },
              Fructose: {
                value:
                  energy?.childs?.carbohydrates?.sugars?.childs?.fructose
                    ?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.fructose
                  ?.blendNutrientRefference?.unitName,
                children: {},
              },
              Lactose: {
                value:
                  energy?.childs?.carbohydrates?.sugars?.childs?.lactose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.lactose
                  ?.blendNutrientRefference?.unitName,
                children: {},
              },
              Maltose: {
                value:
                  energy?.childs?.carbohydrates?.sugars?.childs?.maltose?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.maltose
                  ?.blendNutrientRefference?.unitName,
                children: {},
              },
              Galactose: {
                value:
                  energy?.childs?.carbohydrates?.sugars?.childs?.galactose
                    ?.value,
                Unit: energy?.childs?.carbohydrates?.sugars?.childs?.galactose
                  ?.blendNutrientRefference?.unitName,
                children: {},
              },
            },
          },
          Starch: {
            value: energy?.childs?.carbohydrates?.starch?.value,
            Unit: energy?.childs?.carbohydrates?.starch?.blendNutrientRefference
              ?.unitName,
            children: {},
          },
        },
      },
    },
    Vitamins: {
      "Vitamin C": {
        value: vitamins?.childs?.vitaminC?.value,
        Unit: vitamins?.childs?.vitaminC?.blendNutrientRefference?.unitName,
        children: {},
      },
      Thiamin: {
        value: vitamins?.childs?.thiamin?.value,
        Unit: vitamins?.childs?.thiamin?.blendNutrientRefference?.unitName,
        children: {},
      },
      Riboflavin: {
        value: vitamins?.childs?.riboflavin?.value,
        Unit: vitamins?.childs?.riboflavin?.blendNutrientRefference?.unitName,
        children: {},
      },
      Niacin: {
        value: vitamins?.childs?.niacin?.value,
        Unit: vitamins?.childs?.niacin?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Pantothenic acid": {
        value: vitamins?.childs?.pantothenicAcid?.value,
        Unit: vitamins?.childs?.pantothenicAcid?.blendNutrientRefference
          ?.unitName,
        children: {},
      },
      "Vitamin B-6": {
        value: vitamins?.childs?.vitaminB6?.value,
        Unit: vitamins?.childs?.vitaminB6?.blendNutrientRefference?.unitName,
        children: {},
      },
      Biotin: {
        value: vitamins?.childs?.biotin?.value,
        Unit: vitamins?.childs?.biotin?.blendNutrientRefference?.unitName,
        children: {},
      },
      Folate: {
        value: vitamins?.childs?.folate?.value,
        Unit: vitamins?.childs?.folate?.blendNutrientRefference?.unitName,
        children: {},
      },
      Choline: {
        value: vitamins?.childs?.choline?.value,
        Unit: vitamins?.childs?.choline?.blendNutrientRefference?.unitName,
        children: {},
      },
      Betaine: {
        value: vitamins?.childs?.betaine?.value,
        Unit: vitamins?.childs?.betaine?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Vitamin B-12": {
        value: vitamins?.childs?.vitaminB12?.value,
        Unit: vitamins?.childs?.vitaminB12?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Vitamin A": {
        value: vitamins?.childs?.vitaminA?.value,
        Unit: vitamins?.childs?.vitaminA?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Vitamin E": {
        value: vitamins?.childs?.vitaminE?.value,
        Unit: vitamins?.childs?.vitaminE?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Vitamin D": {
        value: vitamins?.childs?.vitaminD?.value,
        Unit: vitamins?.childs?.vitaminD?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Vitamin K": {
        value: vitamins?.childs?.vitaminK?.value,
        Unit: vitamins?.childs?.vitaminK?.blendNutrientRefference?.unitName,
        children: {},
      },
    },
    Minerals: {
      Calcium: {
        value: minerals?.childs?.calcium?.value,
        Unit: minerals?.childs?.calcium?.blendNutrientRefference?.unitName,
        children: {},
      },
      Iron: {
        value: minerals?.childs?.iron?.value,
        Unit: minerals?.childs?.iron?.blendNutrientRefference?.unitName,
        children: {},
      },
      Magnesium: {
        value: minerals?.childs?.magnesium?.value,
        Unit: minerals?.childs?.magnesium?.blendNutrientRefference?.unitName,
        children: {},
      },
      Phosphorus: {
        value: minerals?.childs?.phosphorus?.value,
        Unit: minerals?.childs?.phosphorus?.blendNutrientRefference?.unitName,
        children: {},
      },
      Potassium: {
        value: minerals?.childs?.potassium?.value,
        Unit: minerals?.childs?.potassium?.blendNutrientRefference?.unitName,
        children: {},
      },
      Sodium: {
        value: minerals?.childs?.sodium?.value,
        Unit: minerals?.childs?.sodium?.blendNutrientRefference?.unitName,
        children: {},
      },
      Zinc: {
        value: minerals?.childs?.zinc?.value,
        Unit: minerals?.childs?.zinc?.blendNutrientRefference?.unitName,
        children: {},
      },
      Copper: {
        value: minerals?.childs?.copper?.value,
        Unit: minerals?.childs?.copper?.blendNutrientRefference?.unitName,
        children: {},
      },
      Manganese: {
        value: minerals?.childs?.manganese?.value,
        Unit: minerals?.childs?.manganese?.blendNutrientRefference?.unitName,
        children: {},
      },
      Iodine: {
        value: minerals?.childs?.iodine?.value,
        Unit: minerals?.childs?.iodine?.blendNutrientRefference?.unitName,
        children: {},
      },
      Salenium: {
        value: minerals?.childs?.salenium?.value,
        Unit: minerals?.childs?.salenium?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Sulfur, S": {
        value: minerals?.childs?.sulfur?.value,
        Unit: minerals?.childs?.sulfur?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Nickel, Ni": {
        value: minerals?.childs?.nickel?.value,
        Unit: minerals?.childs?.nickel?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Molybdenum, Mo": {
        value: minerals?.childs?.molybdenum?.value,
        Unit: minerals?.childs?.molybdenum?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Colbalt, Co": {
        value: minerals?.childs?.colbalt?.value,
        Unit: minerals?.childs?.colbalt?.blendNutrientRefference?.unitName,
        children: {},
      },
      "Boron, B": {
        value: minerals?.childs?.boron?.value,
        Unit: minerals?.childs?.boron?.blendNutrientRefference?.unitName,
        children: {},
      },
      Fluoride: {
        value: minerals?.childs?.Fluoride?.value,
        Unit: minerals?.childs?.Fluoride?.blendNutrientRefference?.unitName,
        children: {},
      },
    },
  };
};
