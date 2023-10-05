import FilterItemWithCheckmark from "components/sidetray/common/filterItemWithCharkmark";
import React from "react";
import CustomAccordion from "theme/accordion/accordion.component";

enum BlendIngredientType {
  Leafy = "LEAFY",
  Berry = "BERRY",
  Herbal = "HERBAL",
  Fruity = "FRUITY",
  Balancer = "BALANCER",
  Fatty = "FATTY",
  Seasoning = "SEASONING",
  Flavor = "FLAVOR",
  Rooty = "ROOTY",
  Flowering = "FLOWERING",
  Liquid = "LIQUID",
  "Tube-Squash" = "TUBE_SQUASH",
}
enum NutrientCategoryFilterType {
  Macronutrients = "MACRO_NUTRIENTS",
  Micronutrients = "MICRO_NUTRIENTS",
  Vitamin = "VITAMIN",
  Minerals = "MINERAL",
}

const WikiFilterTagSection = () => {
  return (
    <div className="mt-20">
      <CustomAccordion title="BlendIngredientType" iconRight={true}>
        {Object.entries(BlendIngredientType).map(([key, value]) => (
          <FilterItemWithCheckmark key={key} label={key} isChecked={() => true} value={value} onClick={() => {}} />
        ))}
      </CustomAccordion>
      <CustomAccordion title="Nutrient Category" iconRight={true}>
        {Object.entries(NutrientCategoryFilterType).map(([key, value]) => (
          <FilterItemWithCheckmark key={key} label={key} isChecked={() => true} value={value} onClick={() => {}} />
        ))}
      </CustomAccordion>
    </div>
  );
};

export default WikiFilterTagSection;
