import React, { Dispatch, SetStateAction } from "react";
import s from "./WikiLeft.module.scss";
import FilterbottomComponent from "../../sidetray/filter/filterBottom.component";
import WikiType from "../wikiType/WikiType";
import { useRouter } from "next/router";
import WikiNutritionPanel from "../wikiNutritionPanel/WikiNutritionPanel";
import WikiHealthPanel from "../wikiHealthPanel/WikiHealthPanel";

interface Props {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  selectedWikiItem?: string[];
  setSelectedWikiItem?: Dispatch<SetStateAction<string[]>>;
}

const WikiLeft = ({
  type = "",
  selectedWikiItem = [],
  setSelectedWikiItem = () => {},
  setType = () => {},
}: Props) => {
  const router = useRouter();
  const checkActive = (id: string) => {
    return selectedWikiItem?.includes(id);
  };

  const handleItemClick = (item: any = {}, isExist) => {
    if (isExist) {
      //router?.push(`/wiki/${type}`);
      setSelectedWikiItem((wikiItem) =>
        wikiItem?.filter((items) => items !== item?._id),
      );
    } else {
      setSelectedWikiItem((wikiItem) => [...wikiItem, item?._id]);
      // const measurementWeight = item?.portions?.find(
      //   (items) => items?.default,
      // )?.meausermentWeight;

      // if (measurementWeight) {
      //   router?.push(`/wiki/${type}/${item?._id}/${measurementWeight}`);
      // }
    }
  };

  const renderUi = (type: string = "") => {
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
      {type && renderUi(type)}
    </div>
  );
};

export default WikiLeft;
