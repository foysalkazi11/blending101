/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import CheckCircle from "../../../../public/icons/check_circle_black_36dp.svg";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setIngredientsToList } from "../../../../redux/edit_recipe/quantity";
import CalciumSearchElem from "../../../../theme/calcium/calcium.component";
import DropdownTwoComponent from "../../../../theme/dropDown/dropdownTwo.component";
import Linearcomponent from "../../../../theme/linearProgress/LinearProgress.component";
import SwitchTwoComponent from "../../../../theme/switch/switchTwo.component";
import styles from "./left_tray_recipe_edit.module.scss";
import { filterRankingList } from "./left_tray_recipe_edit_list";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";
import { INGREDIENTS_BY_CATEGORY_AND_CLASS } from "../../../../gqlLib/recipes/queries/getEditRecipe";
import FilterbottomComponent from "../../../sidetray/filter/filterBottom.component";

const categories = [
  { title: "All", val: "All" },
  { title: "Leafy", val: "Leafy" },
  { title: "Berry", val: "Berry" },
  { title: "Herbal", val: "Herbal" },
  { title: "Fruity", val: "Fruity" },
  { title: "Balancer", val: "Balancer" },
  { title: "Fatty", val: "Fatty" },
  { title: "Seasoning", val: "Seasoning" },
  { title: "Flavor", val: "Flavor" },
  { title: "Rooty", val: "Rooty" },
  { title: "Flowering", val: "Flowering" },
  { title: "Liquid", val: "Liquid" },
  { title: "Tube-Squash", val: "Tube-Squash" },
];

interface recipeData {
  recipeData?: any;
  mode?: string;
}
const Left_tray_recipe_edit = ({ recipeData, mode }: recipeData) => {
  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState({ title: "All", val: "all" });
  const [input, setinput] = useState("");
  const ingredients = filterRankingList;

  const dispatch = useAppDispatch();

  const ingredients_list = useAppSelector(
    (state) => state.quantityAdjuster.ingredientsList
  );

  const handleIngredientClick = (ingredient) => {
    let blendz = [];
    let present = false;
    ingredients_list?.forEach((blen) => {
      if (blen === ingredient) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...ingredients_list, ingredient];
    } else {
      blendz = ingredients_list?.filter((blen) => {
        return blen !== ingredient;
      });
    }

    dispatch(setIngredientsToList(blendz));
  };

  const checkActive = (ingredient: string) => {
    let present = false;
    ingredients_list?.forEach((blen) => {
      //@ts-ignore
      if (blen.ingredientName === ingredient) {
        present = true;
      }
    });
    return present;
  };

  const [searchElemList, setSearchElemList] = useState([]);
  const [searchElemListFilter, setSearchElemListFilter] = useState([]);

  const SearchResults = (value) => {
    setinput(value);
    const elements = searchElemList?.filter((item) => {
      return item.ingredientName.includes(value);
    });
    setSearchElemListFilter(elements);
  };

  const DropDown = (dpd) => {
    if (dpd.title !== "All") {
      const classElements = searchElemList?.filter((item) => {
        return item.category === dpd.title;
      });
      setSearchElemListFilter(classElements);
    } else {
      setSearchElemListFilter(searchElemList);
    }
  };

  const [
    filterIngredientByCategoryAndClass,
    { loading: searchInProcess, data: searchElement },
  ] = useLazyQuery(INGREDIENTS_BY_CATEGORY_AND_CLASS, {
    fetchPolicy: "network-only",
    variables: { classType: "All" },
  });

  const fetchSearchResults = async () => {
    await filterIngredientByCategoryAndClass();
    setSearchElemList(searchElement?.filterIngredientByCategoryAndClass);
    setSearchElemListFilter(searchElement?.filterIngredientByCategoryAndClass);
  };

  useEffect(() => {
    if (!searchInProcess) {
      fetchSearchResults();
    }
  }, [searchInProcess]);

  useEffect(() => {
    DropDown(dpd);
  }, [dpd]);

  return (
    <div className={styles.left_main_container}>
      <div className={styles.filter}>
        <div className={styles.filter__top} style={{ marginTop: "15px" }}>
          <h3>Ingredients</h3>
          {/* <FilterbottomComponent /> */}
          <FilterbottomComponent categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Left_tray_recipe_edit;
