/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../../../../theme/dropDown/DropDown.component";
import styles from "../filter.module.scss";
import useGetAllIngredientsDataBasedOnNutrition from "../../../../customHooks/useGetAllIngredientsDataBasedOnNutrition";
import IngredientPictureSection from "../ingredientPictureSection/IngredientPictureSection";
import RankingSection from "../rankingSection/RankingSection";
import { Portion } from "../../../../type/wikiCompareList";
import { categories } from "../../../../data/categories";
import ToggleMenu from "../../../../theme/toggleMenu/ToggleMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faRankingStar } from "@fortawesome/pro-light-svg-icons";
import { ToggleMenuType } from "../../../../type/toggleMenuType";
import { FilterCriteriaValue } from "../../../../type/filterType";
import { WikiType } from "type/wikiListType";
export interface ingredientState {
  name: string;
  value: number;
  units: string;
  ingredientId: string;
  portion: Portion;
}

export interface List {
  name: string;
  value: string;
}

interface Props {
  scrollAreaMaxHeight?: number;
  checkActiveIngredient: (id: string) => boolean;
  handleIngredientClick: (
    value?: WikiType | FilterCriteriaValue,
    present?: boolean,
    extraInfo?: any | FilterCriteriaValue,
  ) => void;
  ingredientCategoryData?: any[];
  ingredientCategoryLoading?: boolean;
  showHeader?: boolean;
  toggleMenuType?: ToggleMenuType;
}

export default function FilterBottomComponent({
  checkActiveIngredient = () => false,
  handleIngredientClick = () => {},
  scrollAreaMaxHeight,
  ingredientCategoryData = [],
  ingredientCategoryLoading = false,
  showHeader = true,
  toggleMenuType = "outlineSecondary",
}: Props) {
  const [toggle, setToggle] = useState(0);
  const [dpd, setDpd] = useState("All");
  const [searchIngredientData, setSearchIngredientData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const isMounted = useRef(false);
  const [arrayOrderState, setArrayOrderState] = useState([]);
  const [ascendingDescending, setascendingDescending] = useState(true);
  const [list, setList] = useState<Array<List>>([]);
  const [rankingDropDownState, setRankingDropDownState] = useState("");

  const { data: ingredientData, loading: nutritionLoading } = useGetAllIngredientsDataBasedOnNutrition(
    rankingDropDownState,
    dpd,
    toggle === 1 ? true : false,
  );

  useEffect(() => {
    if (ingredientCategoryData?.length) {
      setSearchIngredientData(ingredientCategoryData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientCategoryData]);

  useEffect(() => {
    if (isMounted.current) {
      if (dpd !== "All") {
        setSearchIngredientData(ingredientCategoryData?.filter((item) => item?.category === dpd));
      } else {
        setSearchIngredientData(ingredientCategoryData);
      }
      // handleIngredientClick("Ingredient", false, { category: dpd });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpd]);

  useEffect(() => {
    if (isMounted.current) {
      if (searchInput === "") {
        setSearchIngredientData(ingredientCategoryData);
      } else {
        const filter = ingredientCategoryData?.filter((item) =>
          //@ts-ignore
          item?.ingredientName?.toLowerCase()?.includes(searchInput?.toLowerCase()),
        );
        setSearchIngredientData(filter);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);
  useEffect(() => {
    if (isMounted.current) {
      if (!ingredientData?.getAllIngredientsDataBasedOnNutrition) return;
      let tempArray = ascendingDescending
        ? [...ingredientData?.getAllIngredientsDataBasedOnNutrition]
        : [...ingredientData?.getAllIngredientsDataBasedOnNutrition]?.reverse();
      setArrayOrderState(tempArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ascendingDescending, ingredientData?.getAllIngredientsDataBasedOnNutrition]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={styles.filter__top}>
      {showHeader && (
        <div className={styles.header}>
          <h3 className={styles.title}>Ingredients</h3>
        </div>
      )}

      <div className={styles.filter__bottom}>
        <ToggleMenu
          setToggle={setToggle}
          toggle={toggle}
          toggleMenuList={[
            <div key={"key0"} className="d-flex ai-center">
              <FontAwesomeIcon icon={faImage} style={{ marginRight: "5px" }} />
              <p>Picture</p>
            </div>,
            <div key={"key1"} className="d-flex ai-center">
              <FontAwesomeIcon icon={faRankingStar} style={{ marginRight: "5px" }} />
              <p>Ranking</p>
            </div>,
          ]}
          variant={toggleMenuType}
        />
        <div className={styles.dropdown}>
          <Dropdown
            value={dpd}
            listElem={categories?.map((cat) => ({
              name: cat.label,
              value: cat.value,
            }))}
            onChange={(e) => setDpd(e?.target?.value)}
            border="borderSecondary"
          />
        </div>
        {toggle === 0 ? (
          <IngredientPictureSection
            checkActiveItem={checkActiveIngredient}
            handleBlendAndIngredientUpdate={handleIngredientClick}
            ingredientCategory={dpd}
            loading={ingredientCategoryLoading}
            searchIngredientData={searchIngredientData}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            scrollAreaMaxHeight={scrollAreaMaxHeight}
          />
        ) : (
          <RankingSection
            allIngredients={ingredientCategoryData}
            arrayOrderState={arrayOrderState}
            ascendingDescending={ascendingDescending}
            checkActiveItem={checkActiveIngredient}
            handleBlendAndIngredientUpdate={handleIngredientClick}
            list={list}
            nutritionLoading={nutritionLoading}
            rankingDropDownState={rankingDropDownState}
            setList={setList}
            setRankingDropDownState={setRankingDropDownState}
            setascendingDescending={setascendingDescending}
            scrollAreaMaxHeight={scrollAreaMaxHeight}
          />
        )}
      </div>
    </div>
  );
}
