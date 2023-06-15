import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import s from "./WikiLeft.module.scss";
import WikiTypes from "../wikiTypes/WikiTypes";
import { SelectedWikiType } from "..";
import {
  Portion,
  WikiType as Type,
  WikiType,
} from "../../../type/wikiListType";
import WikiIngredientSection from "../wikiIngredientSection";
import { useRouter } from "next/router";
import WikiNutrientSection from "../wikiNutrientSection";
import WikiHealthSection from "../wikiHealthSection";
import PanelHeader from "../../recipe/share/panelHeader/PanelHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-light-svg-icons";
interface Props {
  currentWikiType?: WikiType;
  currentWikiId?: string;
  selectedWikiItem?: SelectedWikiType;
  setSelectedWikiItem?: Dispatch<SetStateAction<SelectedWikiType>>;
  showWikiTypeHeader?: boolean;
}

const WikiLeft = ({
  currentWikiType = "",
  currentWikiId = "",
  selectedWikiItem = {} as SelectedWikiType,
  setSelectedWikiItem = () => {},
  showWikiTypeHeader = true,
}: Props) => {
  const router = useRouter();
  const [type, setType] = useState<WikiType>("Ingredient");
  const checkActive = (id: string) => {
    return currentWikiId === id;
  };

  // click wiki item title
  const handleClickTitle = async (
    type: string,
    id: string,
    portions?: Portion[],
  ) => {
    if (type === "Nutrient") {
      router?.push(`/wiki/${type}/${id}`);
    } else {
      const measurementWeight = portions?.find(
        (items) => items?.default,
      )?.meausermentWeight;

      if (measurementWeight) {
        router?.push(`/wiki/${type}/${id}/${measurementWeight}`);
      }
    }
  };

  const handleItemClick = (item: any = {}, isExist) => {
    if (item?.hasOwnProperty("ingredientName")) {
      handleClickTitle("Ingredient", item?._id, item?.portions);
    }
    if (item?.hasOwnProperty("nutrientName")) {
      handleClickTitle("Nutrient", item?._id);
    }

    // setSelectedWikiItem(item?._id);
    // const checkWikiList = (list: string[], id: string) => {
    //   if (list?.length) {
    //     return [...list, id];
    //   } else {
    //     return [id];
    //   }
    // };
    // if (isExist) {
    //   setSelectedWikiItem((wikiItem) => ({
    //     ...wikiItem,
    //     [type]: wikiItem[type]?.filter((items) => items !== item?._id) || [],
    //   }));
    // } else {
    //   setSelectedWikiItem((wikiItem) => ({
    //     ...wikiItem,
    //     [type]: [...checkWikiList(wikiItem[type], item?._id)],
    //   }));
    // }
  };

  useEffect(() => {
    //@ts-ignore
    if (currentWikiType && currentWikiType !== "compare") {
      setType(currentWikiType);
    } else {
      setType("Ingredient");
    }
  }, [currentWikiType]);

  const renderUi = (type: Type) => {
    switch (type) {
      case "Ingredient":
        return (
          <WikiIngredientSection
            checkActive={checkActive}
            handleItemClick={handleItemClick}
          />
        );
      case "Nutrient":
        return (
          <WikiNutrientSection
            checkActive={checkActive}
            handleItemClick={handleItemClick}
          />
        );

      case "Health":
        return (
          <WikiHealthSection
            checkActive={checkActive}
            handleItemClick={handleItemClick}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      {!showWikiTypeHeader && (
        <PanelHeader
          title="Wiki Type"
          icon={<FontAwesomeIcon icon={faCircleInfo} fontSize={24} />}
        />
      )}

      <div className={s.wikiLeftContainer}>
        <WikiTypes
          type={type}
          setType={setType}
          showHeader={showWikiTypeHeader}
        />
        {renderUi(type)}
      </div>
    </>
  );
};

export default WikiLeft;
