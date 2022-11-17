/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import TrayWrapper from "../TrayWrapper";
import styles from "./filter.module.scss";
import { FaEye } from "react-icons/fa";
import { BsTagsFill } from "react-icons/bs";
import TagSection from "./tag/TagSection";
import VisualSection from "./visaul/VisualSection";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenFilterTray } from "../../../redux/slices/sideTraySlice";
import TrayTag from "../TrayTag";
import { FiFilter } from "react-icons/fi";
import {
  FilterCriteriaOptions,
  FilterCriteriaValue,
  updateFilterCriteriaItem,
} from "../../../redux/slices/filterRecipeSlice";
import { useQuery } from "@apollo/client";
import { FETCH_BLEND_CATEGORIES } from "../../../gqlLib/category/queries/fetchCategories";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";

export default function Filtertray({ filter }) {
  const [toggle, setToggle] = useState(1);
  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const { allFilters } = useAppSelector((state) => state?.filterRecipe);
  const ref = useRef<any>();
  const dispatch = useAppDispatch();
  const { data: blendCategoryData, loading: blendCategoryLoading } = useQuery(
    FETCH_BLEND_CATEGORIES,
  );
  const { data: ingredientCategoryData, loading: ingredientCategoryLoading } =
    useQuery(FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS, {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 1,
        },
      },
    });

  // toggle tab
  const handleToggle = (no: number) => {
    if (no === 1) {
      ref.current.style.left = "0";
    } else {
      ref.current.style.left = "50%";
    }
    setToggle(no);
  };

  const toggleTray = () => {
    dispatch(setOpenFilterTray(!openFilterTray));
  };

  //check active filter item
  const checkActiveItem = (id: string) => {
    return allFilters.some((item) => item?.id === id);
  };

  // blend and ingredient update function
  const handleBlendAndIngredientUpdate = (
    item: any | FilterCriteriaValue,
    isItemExist: boolean,
  ) => {
    // const isItemExist = checkActiveItem(item?.id);
    dispatch(
      updateFilterCriteriaItem({
        updateStatus: isItemExist ? "remove" : "add",
        value: item,
        filterCriteria: item.filterCategory,
      }),
    );
  };

  return (
    <TrayWrapper
      closeTray={toggleTray}
      openTray={openFilterTray}
      showTagByDefaut={false}
      showPanle="left"
      panleTag={(hover) => (
        <TrayTag icon={<FiFilter />} placeMent="left" hover={hover} />
      )}
    >
      <div className={styles.main}>
        <div className={styles.main__top}>
          <div className={styles.main__top__menu}>
            <div className={styles.active} ref={ref}></div>
            <div
              className={
                toggle === 2
                  ? styles.main__top__menu__child
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(1)}
            >
              <FaEye className={styles.tag} /> Visual
            </div>
            <div
              className={
                toggle === 1
                  ? styles.main__top__menu__child
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(2)}
            >
              <BsTagsFill className={styles.tag} /> Tags
            </div>
          </div>
        </div>
      </div>

      {toggle === 1 ? (
        <VisualSection
          checkActiveItem={checkActiveItem}
          handleBlendAndIngredientUpdate={handleBlendAndIngredientUpdate}
          blendCategoryData={blendCategoryData?.getAllCategories}
          blendCategoryLoading={blendCategoryLoading}
          ingredientCategoryData={
            ingredientCategoryData?.filterIngredientByCategoryAndClass
          }
          ingredientCategoryLoading={ingredientCategoryLoading}
        />
      ) : (
        <TagSection
          checkActiveItem={checkActiveItem}
          handleBlendAndIngredientUpdate={handleBlendAndIngredientUpdate}
          blendCategoryData={blendCategoryData?.getAllCategories}
          blendCategoryLoading={blendCategoryLoading}
          ingredientCategoryData={
            ingredientCategoryData?.filterIngredientByCategoryAndClass
          }
          ingredientCategoryLoading={ingredientCategoryLoading}
        />
      )}
    </TrayWrapper>
  );
}
