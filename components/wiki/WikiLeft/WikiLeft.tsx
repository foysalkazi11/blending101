import React, { SetStateAction, useEffect, useState } from "react";
import s from "./WikiLeft.module.scss";
import WikiTypes from "../wikiTypes/WikiTypes";
import { SelectedWikiType, SelectedWikiTypeProps, WikiTypeSectionDetails } from "..";
import { Portion, WikiType as Type, WikiType } from "../../../type/wikiListType";
import WikiIngredientSection from "../wikiIngredientSection";
import { useRouter } from "next/router";
import WikiNutrientSection from "../wikiNutrientSection";
import WikiHealthSection from "../wikiHealthSection";
import PanelHeader from "../../recipe/share/panelHeader/PanelHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowSize from "../../utility/useWindowSize";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import { faFerrisWheel, faList } from "@fortawesome/pro-light-svg-icons";
import WikiThemeContainer from "../wikiTheme/wikiThemContainer";
import { useUser } from "context/AuthProvider";
import GET_WIKI_THEME from "gqlLib/wiki/query/getWikiTheme";
import { useQuery } from "@apollo/client";
import { faBooks } from "@fortawesome/pro-thin-svg-icons";
interface Props {
  selectedWikiItem?: SelectedWikiType;
  setSelectedWikiItem?: Dispatch<SetStateAction<SelectedWikiType>>;
  currentWikiType?: WikiType;
  currentWikiId?: string;
  // selectedWikiType?: SelectedWikiTypeProps;
  // setSelectedWikiType?: (
  //   value: SelectedWikiTypeProps | ((val: SelectedWikiTypeProps) => SelectedWikiTypeProps),
  // ) => void;
  showWikiTypeHeader?: boolean;
  toggle?: WikiTypeSectionDetails;
  //setToggle?: React.Dispatch<React.SetStateAction<number>>;
  setToggle?: (value: WikiTypeSectionDetails) => void;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
  wikiThemeOnClick?: (data: { [key: string]: any }) => void;
  wikiTypeSectionDetails: WikiTypeSectionDetails;
}

const WikiLeft = ({
  currentWikiType = "",
  currentWikiId = "",
  selectedWikiItem,
  setSelectedWikiItem = () => {},
  // selectedWikiType = {} as SelectedWikiTypeProps,
  // setSelectedWikiType = () => {},
  showWikiTypeHeader = true,
  toggle,
  setToggle = () => {},
  setInput = () => {},
  wikiThemeOnClick = () => {},
  wikiTypeSectionDetails,
}: Props) => {
  const [showWikiType, setShowWikiType] = useState(true);
  const [showTabMenu, setShowTabMenu] = useState(true);
  // const [toggle, setToggle] = useState(1);
  const [panelHeight, setPanelHeight] = useState(0);
  const router = useRouter();
  // const [type, setType] = useState<WikiType>("Ingredient");
  const user = useUser();
  const { data, loading } = useQuery(GET_WIKI_THEME, {
    variables: { widgetSlug: "wiki-summer", userId: user?.id, currentDate: new Date().toISOString().slice(0, 10) },
  });

  const checkActiveWikiTheme = (id: string) => {
    if (wikiTypeSectionDetails.wikiTypeSection === "theme" && wikiTypeSectionDetails.isSelectedTheme) {
      return wikiTypeSectionDetails.activeTheme?._id === id;
    }
  };

  const checkActiveWikiItem = (id: string) => {
    // return selectedWikiType?.selectedItems?.includes(id);
    return currentWikiId === id;
  };
  const { height } = useWindowSize();

  const getOffset = (element: HTMLElement): number => {
    const rect = element?.getBoundingClientRect();
    const height = element.offsetHeight;
    // scrollTop = window.scrollY || document.documentElement.scrollTop;

    return rect?.top;
  };

  useEffect(() => {
    setPanelHeight(window?.innerHeight);
  }, []);

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
    const heightToHideTabMenu = heightToHideWikiType + TabMenuOffset + TabMenuComponentHeight;

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
      !showTabMenu && setPanelHeight(window.innerHeight + WikiTypeComponentHeight);
    }
  }, [showTabMenu, showWikiType]);

  // click wiki item title
  const handleClickTitle = async (type: WikiType, id: string, portions?: Portion[]) => {
    if (type === "Nutrient") {
      if (checkActiveWikiItem(id)) {
        handleUpdateWikiSection(type);
      } else {
        router?.push(`/wiki/${type}/${id}`);
      }
    } else {
      const measurementWeight = portions?.find((items) => items?.default)?.meausermentWeight;
      if (measurementWeight) {
        if (checkActiveWikiItem(id)) {
          handleUpdateWikiSection(type);
        } else {
          router?.push(`/wiki/${type}/${id}/${measurementWeight}`);
        }
      }
    }
  };

  const handleItemClick = (type: WikiType, item: any = {}, isExist: boolean, extraInfo?: any) => {
    // if (selectedWikiType?.wikiType === type) {
    //   if (extraInfo?.hasOwnProperty("category")) {
    //     SetSelectedWikiType({
    //       ...selectedWikiType,
    //       category: extraInfo.category,
    //       selectedItems: [],
    //       searchTerm: "",
    //     });
    //   } else {
    //     SetSelectedWikiType({
    //       ...selectedWikiType,
    //       selectedItems: selectedWikiType?.selectedItems?.includes(item?._id)
    //         ? selectedWikiType?.selectedItems?.filter((id) => id !== item?._id)
    //         : [...selectedWikiType?.selectedItems, item?._id],
    //       searchTerm: "",
    //     });
    //   }
    // } else {
    //   SetSelectedWikiType({ wikiType: type, category: "", selectedItems: [], searchTerm: "" });
    // }
    if (item?.hasOwnProperty("ingredientName")) {
      handleClickTitle("Ingredient", item?._id, item?.portions);
    }
    if (item?.hasOwnProperty("nutrientName")) {
      handleClickTitle("Nutrient", item?._id);
    }

    // setInput("");
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

  // useEffect(() => {
  //   setToggle(0);
  // }, [type]);

  // useEffect(() => {
  //   //@ts-ignore
  //   if (currentWikiType && currentWikiType !== "compare") {
  //     setType(currentWikiType);
  //   } else {
  //     setType("Ingredient");
  //   }
  // }, [currentWikiType]);

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
            checkActive={checkActiveWikiItem}
            handleItemClick={(item, isExist, extraInfo) => handleItemClick(type, item, isExist, extraInfo)}
            scrollAreaMaxHeight={window?.innerHeight - 480}
          />
        );
      case "Nutrient":
        return (
          <WikiNutrientSection
            checkActive={checkActiveWikiItem}
            handleItemClick={(item, isExist, extraInfo) => handleItemClick(type, item, isExist, extraInfo)}
            scrollAreaMaxHeight={window?.innerHeight - 420}
          />
        );

      case "Health":
        return (
          <WikiHealthSection
            checkActive={checkActiveWikiItem}
            handleItemClick={(item, isExist, extraInfo) => handleItemClick(type, item, isExist, extraInfo)}
          />
        );

      default:
        break;
    }
  };

  const handleUpdateWikiSection = (type: WikiType) => {
    router?.push(`/wiki/${type}`);
    // setToggle({
    //   wikiTypeSection: "list",
    //   wikiType: type,
    //   wikiId: null,
    // });

    // if (selectedWikiType?.wikiType !== type) {
    //   setSelectedWikiType({ wikiType: type, category: "", selectedItems: [], searchTerm: "" });
    // }
    // setInput("");
    // setSelectedWikiType((pre) => (pre?.wikiType === type ? pre : { wikiType: type, category: "", selectedItems: [] }));
  };

  const handleToggleMenu = (value: number) => {
    if (value === 1) {
      handleUpdateWikiSection("Ingredient");
      // setToggle({
      //   wikiTypeSection: "list",
      //   wikiType: "Ingredient",
      // });
      // setSelectedWikiType((type) => {
      //   if (type?.wikiType) {
      //     return type;
      //   } else {
      //     return { wikiType: "Ingredient", category: "", selectedItems: [], searchTerm: "" };
      //   }
      // });
    } else {
      router?.push(`/wiki`);
      // setSelectedWikiType({ wikiType: "", category: "", selectedItems: [], searchTerm: "" });
      // setToggle({
      //   wikiTypeSection: "theme",
      //   isSelectedTheme: false,
      // });
    }

    // setToggle(value);
    // setInput("");
  };

  return (
    <div className="sticky_top">
      {!showWikiTypeHeader && <PanelHeader title="Wiki Type" icon={<FontAwesomeIcon icon={faBooks} fontSize={24} />} />}

      <div className={s.wikiLeftContainer}>
        <div id="toggleTabContainer">
          {showTabMenu && (
            <ToggleMenu
              setToggle={handleToggleMenu}
              toggle={toggle?.wikiTypeSection === "list" ? 1 : 0}
              toggleMenuList={[
                <div key={"key1"} className="d-flex ai-center">
                  <FontAwesomeIcon icon={faFerrisWheel} style={{ marginRight: "5px" }} />
                  <p>Categories</p>
                </div>,
                <div key={"key0"} className="d-flex ai-center">
                  <FontAwesomeIcon icon={faList} style={{ marginRight: "5px" }} />
                  <p>List</p>
                </div>,
              ]}
              variant={"outlineSecondary"}
            />
          )}
        </div>

        {toggle?.wikiTypeSection === "list" ? (
          <>
            <div id="wikiTypeContainer">
              {showWikiType && (
                <WikiTypes
                  type={wikiTypeSectionDetails.wikiTypeSection === "list" && wikiTypeSectionDetails?.wikiType}
                  setType={handleUpdateWikiSection}
                  showHeader={showWikiTypeHeader}
                />
              )}
            </div>
            {renderUi(wikiTypeSectionDetails.wikiTypeSection === "list" && wikiTypeSectionDetails?.wikiType)}
          </>
        ) : (
          <WikiThemeContainer
            wikiThemeOnClick={wikiThemeOnClick}
            checkActiveWiki={checkActiveWikiTheme}
            scrollAreaMaxHeight={panelHeight - 310}
            loading={loading}
            data={data?.getEntityWidget?.widgetCollections}
          />
        )}
      </div>
    </div>
  );
};

export default WikiLeft;
