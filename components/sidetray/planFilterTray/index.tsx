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
import { useQuery } from "@apollo/client";
import { FETCH_BLEND_CATEGORIES } from "../../../gqlLib/category/queries/fetchCategories";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import TagSectionForPlan from "./tagSection";
import { setIsPlanFilterOpen } from "../../../redux/slices/planFilterSlice";
import { FilterCriteriaValue } from "../../../type/filterType";
import useToUpdateActiveFilterTagForPlan from "../../../customHooks/planFilter/useToUpdateActiveFilterTagForPlan";
import useToUpdateFilterCriteriaForPlan from "../../../customHooks/planFilter/useToUpdateFilterCriteriaForPlan";

interface Props {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

function PlanFilterTray({ showPanle, showTagByDefaut }: Props) {
  const { isPlanFilterOpen } = useAppSelector((state) => state?.planFilter);
  const { allFiltersForPlan, activeFilterTagForPlan } = useAppSelector(
    (state) => state?.planFilter,
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
  // handle update recipe filter criteria
  const handleUpdateFilterCriteriaForPlan = useToUpdateFilterCriteriaForPlan();
  // handle update recipe active filter tag
  const handleUpdateActiveFilterTagForPlan =
    useToUpdateActiveFilterTagForPlan();

  const toggleTray = () => {
    dispatch(setIsPlanFilterOpen(!isPlanFilterOpen));
  };

  //check active filter item
  const checkActiveItem = (id: string) => {
    return allFiltersForPlan.some((item) => item?.id === id);
  };
  //check active filter item
  const checkExcludeIngredientIds = (id: string) => {
    return allFiltersForPlan.some(
      (item) =>
        item?.filterCriteria === "includeIngredientIds" &&
        item?.id === id &&
        //@ts-ignore
        item?.excludeIngredientIds,
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
        toggle={0}
        toggleMenuList={[
          <div key={"key1"} className="flex ai-center">
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
        handleUpdateActiveFilterTag={handleUpdateActiveFilterTagForPlan}
        handleUpdateFilterCriteria={handleUpdateFilterCriteriaForPlan}
      />
    </TrayWrapper>
  );
}

export default PlanFilterTray;
