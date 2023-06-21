/* eslint-disable @next/next/no-img-element */
import React from "react";
import TrayWrapper from "../TrayWrapper";
import styles from "../filter/filter.module.scss";
import { FaEye } from "react-icons/fa";
import { BsTagsFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenFilterTray } from "../../../redux/slices/sideTraySlice";
import TrayTag from "../TrayTag";
import { FiFilter } from "react-icons/fi";
import {
  FilterCriteriaValue,
  updateActiveFilterTag,
  updateFilterCriteriaItem,
} from "../../../redux/slices/filterRecipeSlice";
import { useQuery } from "@apollo/client";
import { FETCH_BLEND_CATEGORIES } from "../../../gqlLib/category/queries/fetchCategories";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import TagSectionForPlan from "./tagSection";
import { setIsPlanFilterOpen } from "../../../redux/slices/planFilterSlice";

interface Props {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

function PlanFilterTray({ showPanle, showTagByDefaut }: Props) {
  const { isPlanFilterOpen } = useAppSelector((state) => state?.planFilter);
  const { allFilters, activeFilterTag } = useAppSelector(
    (state) => state?.filterRecipe,
  );
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
    dispatch(
      updateActiveFilterTag({
        ...activeFilterTag,
        activeSection: no === 0 ? "visual" : "tags",
      }),
    );
  };

  const toggleTray = () => {
    dispatch(setIsPlanFilterOpen(!isPlanFilterOpen));
  };

  //check active filter item
  const checkActiveItem = (id: string) => {
    return allFilters.some((item) => item?.id === id);
  };
  //check active filter item
  const checkExcludeIngredientIds = (id: string) => {
    return allFilters.some(
      (item) =>
        item?.filterCriteria === "includeIngredientIds" &&
        item?.id === id &&
        //@ts-ignore
        item?.excludeIngredientIds,
    );
  };

  // blend and ingredient update function
  const handleBlendAndIngredientUpdate = (
    item: any | FilterCriteriaValue,
    isItemExist: boolean,
    extraInfo?: any,
  ) => {
    // const isItemExist = checkActiveItem(item?.id);
    dispatch(
      updateFilterCriteriaItem({
        updateStatus: isItemExist ? "remove" : "add",
        value: extraInfo,
        filterCriteria: item.filterCategory,
      }),
    );
  };

  return (
    <TrayWrapper
      closeTray={toggleTray}
      openTray={isPlanFilterOpen}
      showTagByDefaut={showTagByDefaut}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag icon={<FiFilter />} placeMent="left" hover={hover} />
      )}
    >
      <ToggleMenu
        setToggle={handleToggle}
        toggle={activeFilterTag.activeSection === "visual" ? 0 : 1}
        toggleMenuList={[
          <div key={"key1"} style={{ display: "flex", alignItems: "center" }}>
            <BsTagsFill className={styles.tag} />
            <p>Tags</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />

      <TagSectionForPlan
        checkActiveItem={checkActiveItem}
        blendCategoryData={blendCategoryData?.getAllCategories}
        blendCategoryLoading={blendCategoryLoading}
        ingredientCategoryData={
          ingredientCategoryData?.filterIngredientByCategoryAndClass
        }
        ingredientCategoryLoading={ingredientCategoryLoading}
        checkExcludeIngredientIds={checkExcludeIngredientIds}
      />
    </TrayWrapper>
  );
}

export default PlanFilterTray;
