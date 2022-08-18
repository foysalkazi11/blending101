/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import Dropdown from "../../../../theme/dropDown/DropDown.component";
import SwitchTwoComponent from "../../../../theme/switch/switchTwo.component";
import styles from "../filter.module.scss";
import { useLazyQuery } from "@apollo/client";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import { setAllIngredients } from "../../../../redux/slices/ingredientsSlice";
import useGetAllIngredientsDataBasedOnNutrition from "../../../../customHooks/useGetAllIngredientsDataBasedOnNutrition";
import IngredientPictureSection from "../ingredientPictureSection/IngredientPictureSection";
import RankingSection from "../rankingSection/RankingSection";
import { Portion } from "../../../../type/wikiCompareList";

export const categories = [
  { name: "All", value: "All" },
  { name: "Leafy", value: "Leafy" },
  { name: "Berry", value: "Berry" },
  { name: "Herbal", value: "Herbal" },
  { name: "Fruity", value: "Fruity" },
  { name: "Balancer", value: "Balancer" },
  { name: "Fatty", value: "Fatty" },
  { name: "Seasoning", value: "Seasoning" },
  { name: "Flavor", value: "Flavor" },
  { name: "Rooty", value: "Rooty" },
  { name: "Flowering", value: "Flowering" },
  { name: "Liquid", value: "Liquid" },
  { name: "Tube-Squash", value: "Tube-Squash" },
];

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
  scrollAreaMaxHeight?: React.CSSProperties;
  handleIngredientClick?: (item: any, exist: boolean) => void;
  checkActiveIngredient?: (arg: any) => boolean;
}

export default function FilterbottomComponent({
  handleIngredientClick = () => {},
  checkActiveIngredient = () => false,
  scrollAreaMaxHeight = { maxHeight: "350px" },
}: Props) {
  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState("All");
  const dispatch = useAppDispatch();
  const { allIngredients } = useAppSelector((state) => state?.ingredients);
  const [searchIngredientData, setSearchIngredientData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const [arrayOrderState, setArrayOrderState] = useState([]);
  const [ascendingDescending, setascendingDescending] = useState(true);
  const [list, setList] = useState<Array<List>>([]);
  const [rankingDropDownState, setRankingDropDownState] = useState("");

  const [filterIngredientByCategroyAndClass] = useLazyQuery(
    FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS,
  );
  const { data: IngredientData, loading: nutritionLoading } =
    useGetAllIngredientsDataBasedOnNutrition(
      rankingDropDownState,
      dpd,
      toggle === 2 ? true : false,
    );

  const fetchFilterIngredientByCategroyAndClass = async () => {
    setLoading(true);
    try {
      const { data } = await filterIngredientByCategroyAndClass({
        variables: {
          data: {
            ingredientCategory: dpd,
            IngredientClass: 1,
          },
        },
      });

      dispatch(setAllIngredients(data?.filterIngredientByCategoryAndClass));
      setSearchIngredientData(data?.filterIngredientByCategoryAndClass);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (!allIngredients?.length) {
      fetchFilterIngredientByCategroyAndClass();
    } else {
      setSearchIngredientData(allIngredients);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (dpd !== "All") {
        setSearchIngredientData(
          allIngredients?.filter((item) => item?.category === dpd),
        );
      } else {
        if (allIngredients?.length) {
          setSearchIngredientData(allIngredients);
        } else {
          fetchFilterIngredientByCategroyAndClass();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpd]);

  useEffect(() => {
    if (isMounted.current) {
      if (searchInput === "") {
        setSearchIngredientData(allIngredients);
      } else {
        const filter = allIngredients?.filter((item) =>
          //@ts-ignore
          item?.ingredientName
            ?.toLowerCase()
            ?.includes(searchInput?.toLowerCase()),
        );
        setSearchIngredientData(filter);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!IngredientData?.getAllIngredientsDataBasedOnNutrition) return;
    let tempArray = ascendingDescending
      ? [...IngredientData?.getAllIngredientsDataBasedOnNutrition]
      : [...IngredientData?.getAllIngredientsDataBasedOnNutrition]?.reverse();
    setArrayOrderState(tempArray);
  }, [ascendingDescending, IngredientData]);

  return (
    <div className={styles.filter__top}>
      <h3>Ingredients</h3>
      <div className={styles.filter__bottom}>
        <SwitchTwoComponent
          value={toggle}
          setValue={setToggle}
          titleOne="Pictures"
          titleTwo="Rankings"
        />
        <div className={styles.dropdown}>
          <Dropdown
            value={dpd}
            listElem={categories}
            handleChange={(e) => setDpd(e?.target?.value)}
          />
        </div>
        {toggle === 1 ? (
          <IngredientPictureSection
            checkActiveIngredient={checkActiveIngredient}
            handleIngredientClick={handleIngredientClick}
            ingredientCategory={dpd}
            loading={loading}
            searchIngredientData={searchIngredientData}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            scrollAreaMaxHeight={scrollAreaMaxHeight}
          />
        ) : (
          <RankingSection
            allIngredients={allIngredients}
            arrayOrderState={arrayOrderState}
            ascendingDescending={ascendingDescending}
            checkActiveIngredient={checkActiveIngredient}
            handleIngredientClick={handleIngredientClick}
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
