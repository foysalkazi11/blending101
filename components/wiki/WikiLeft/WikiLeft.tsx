import React from "react";
import s from "./WikiLeft.module.scss";
import FilterbottomComponent from "../../sidetray/filter/filterBottom.component";
import WikiType from "../wikiType/WikiType";
import { useRouter } from "next/router";
import WikiNutritionPanel from "../wikiNutritionPanel/WikiNutritionPanel";
import WikiHealthPanel from "../wikiHealthPanel/WikiHealthPanel";

interface Props {
  type: string;
  wikiId: string;
}

const WikiLeft = ({ type = "", wikiId = "" }: Props) => {
  const router = useRouter();
  const checkActiveIngredient = (id: string) => {
    return wikiId === id;
  };

  const handleIngredientClick = (item: any = {}, isExist) => {
    if (isExist) {
      router?.push(`/wiki/${type}`);
    } else {
      const measurementWeight = item?.portions?.find(
        (items) => items?.default,
      )?.meausermentWeight;

      if (measurementWeight) {
        router?.push(`/wiki/${type}/${item?._id}/${measurementWeight}`);
      }
    }
  };

  const renderUi = (type: string = "") => {
    switch (type) {
      case "Ingredient":
        return (
          <FilterbottomComponent
            checkActiveIngredient={checkActiveIngredient}
            handleIngredientClick={handleIngredientClick}
            scrollAreaMaxHeight={{ maxHeight: "450px" }}
          />
        );
      case "Nutrition":
        return <WikiNutritionPanel />;

      case "Health":
        return <WikiHealthPanel />;

      default:
        break;
    }
  };

  return (
    <div className={s.wikiLeftContainer}>
      <WikiType type={type} />
      {type && renderUi(type)}
    </div>
  );
};

export default WikiLeft;
