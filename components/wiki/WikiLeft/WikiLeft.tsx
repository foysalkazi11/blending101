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
import useWindowSize from "../../utility/useWindowSize";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import { faFerrisWheel, faList } from "@fortawesome/pro-light-svg-icons";
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
  const [showWikiType, setShowWikiType] = useState(true);
  const [showTabMenu, setShowTabMenu] = useState(true);
  const [toggle, setToggle] = useState(0);
  const [panelHeight, setPanelHeight] = useState(window.innerHeight);
  const router = useRouter();
  const [type, setType] = useState<WikiType>("Ingredient");
  const checkActive = (id: string) => {
    return currentWikiId === id;
  };
  const { height } = useWindowSize();

  const getOffset = (element: HTMLElement): number => {
    const rect = element?.getBoundingClientRect();
    const height = element.offsetHeight;
    // scrollTop = window.scrollY || document.documentElement.scrollTop;

    return rect?.top;
  };

  const listenToScroll = React.useCallback(() => {
    const WikiType = document.getElementById("wikiTypeContainer");
    const TabMenu = document.getElementById("toggleTabContainer");

    const scrollPosition = window.scrollY;
    // const viewportHeight = window.innerHeight;

    const WikiTypeOffset = WikiType?.getBoundingClientRect()?.top;
    const WikiTypeComponentHeight = WikiType?.clientHeight || 79;
    const heightToHideWikiType = WikiTypeOffset + WikiTypeComponentHeight;

    const TabMenuOffset = TabMenu?.getBoundingClientRect().top;
    const TabMenuComponentHeight = TabMenu?.clientHeight || 57;
    const heightToHideTabMenu =
      heightToHideWikiType + TabMenuOffset + TabMenuComponentHeight;

    if (scrollPosition > heightToHideWikiType) {
      showWikiType && setPanelHeight((pre) => pre + WikiTypeComponentHeight);
      showWikiType && // to limit setting state only the first time
        setShowWikiType(false);
    } else {
      !showWikiType && setShowWikiType(true);
      !showWikiType && setPanelHeight(window.innerHeight);
    }
    if (scrollPosition > heightToHideTabMenu) {
      showTabMenu && setPanelHeight((pre) => pre + TabMenuComponentHeight);
      showTabMenu && // to limit setting state only the first time
        setShowTabMenu(false);
    } else {
      !showTabMenu && setShowTabMenu(true);
      !showTabMenu &&
        setPanelHeight(window.innerHeight + WikiTypeComponentHeight);
    }
  }, [showTabMenu, showWikiType]);

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
    setToggle(0);
  }, [type]);

  useEffect(() => {
    //@ts-ignore
    if (currentWikiType && currentWikiType !== "compare") {
      setType(currentWikiType);
    } else {
      setType("Ingredient");
    }
  }, [currentWikiType]);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [listenToScroll]);

  useEffect(() => {
    if (showTabMenu) {
    }
  }, [showTabMenu, showWikiType]);

  const renderUi = (type: Type) => {
    switch (type) {
      case "Ingredient":
        return (
          <WikiIngredientSection
            checkActive={checkActive}
            handleItemClick={handleItemClick}
            scrollAreaMaxHeight={panelHeight - 480}
            toggle={toggle}
          />
        );
      case "Nutrient":
        return (
          <WikiNutrientSection
            checkActive={checkActive}
            handleItemClick={handleItemClick}
            scrollAreaMaxHeight={panelHeight - 420}
            toggle={toggle}
          />
        );

      case "Health":
        return (
          <WikiHealthSection
            checkActive={checkActive}
            handleItemClick={handleItemClick}
            toggle={toggle}
          />
        );

      default:
        break;
    }
  };

  return (
    <div className="sticky_top">
      {!showWikiTypeHeader && (
        <PanelHeader
          title="Wiki Type"
          icon={<FontAwesomeIcon icon={faCircleInfo} fontSize={24} />}
        />
      )}

      <div className={s.wikiLeftContainer}>
        <div id="wikiTypeContainer">
          {showWikiType && (
            <WikiTypes
              type={type}
              setType={setType}
              showHeader={showWikiTypeHeader}
            />
          )}
        </div>
        <div id="toggleTabContainer">
          {showTabMenu && (
            <ToggleMenu
              setToggle={setToggle}
              toggle={toggle}
              toggleMenuList={[
                <div key={"key0"} className="d-flex ai-center">
                  <FontAwesomeIcon
                    icon={faList}
                    style={{ marginRight: "5px" }}
                  />
                  <p>List</p>
                </div>,
                <div key={"key1"} className="d-flex ai-center">
                  <FontAwesomeIcon
                    icon={faFerrisWheel}
                    style={{ marginRight: "5px" }}
                  />
                  <p>Themes</p>
                </div>,
              ]}
              variant={"outlineSecondary"}
            />
          )}
        </div>
        {renderUi(type)}
      </div>
    </div>
  );
};

export default WikiLeft;
