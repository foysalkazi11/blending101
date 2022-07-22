import React, { Dispatch, SetStateAction } from "react";
import s from "./WikiLeft.module.scss";
import FilterbottomComponent from "../../sidetray/filter/filterBottom.component";
import WikiType from "../wikiType/WikiType";
import WikiNutritionPanel from "../wikiNutritionPanel/WikiNutritionPanel";
import WikiHealthPanel from "../wikiHealthPanel/WikiHealthPanel";
import { Type } from "..";
interface Props {
  type: Type;
  setType: Dispatch<SetStateAction<Type>>;
  selectedWikiItem?: string[];
  setSelectedWikiItem?: Dispatch<SetStateAction<string[]>>;
}

const WikiLeft = ({
  type = "Ingredient",
  selectedWikiItem = [],
  setSelectedWikiItem = () => {},
  setType = () => {},
}: Props) => {
  const checkActive = (id: string) => {
    return selectedWikiItem?.includes(id);
  };

  const handleItemClick = (item: any = {}, isExist) => {
    if (isExist) {
      setSelectedWikiItem((wikiItem) =>
        wikiItem?.filter((items) => items !== item?._id),
      );
    } else {
      setSelectedWikiItem((wikiItem) => [...wikiItem, item?._id]);
    }
  };

  const renderUi = (type: Type) => {
    switch (type) {
      case "Ingredient":
        return (
          <FilterbottomComponent
            checkActiveIngredient={checkActive}
            handleIngredientClick={handleItemClick}
            scrollAreaMaxHeight={{ maxHeight: "450px" }}
          />
        );
      case "Nutrient":
        return (
          <WikiNutritionPanel
            checkActiveNutrition={checkActive}
            handleNutritionClick={handleItemClick}
          />
        );

      case "Health":
        return <WikiHealthPanel />;

      default:
        break;
    }
  };

  return (
    <div className={s.wikiLeftContainer}>
      <WikiType type={type} setType={setType} />
      {renderUi(type)}
    </div>
  );
};

export default WikiLeft;
