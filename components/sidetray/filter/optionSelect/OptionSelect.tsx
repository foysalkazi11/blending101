import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { INGREDIENTS_FILTER } from "../static/recipe";
import styles from "./OptionSelect.module.scss";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";
import {
  FilterCriteriaOptions,
  FilterCriteriaValue,
  updateFilterCriteriaItem,
} from "../../../../redux/slices/filterRecipeSlice";
import useHover from "../../../utility/useHover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

type OptionSelectProps = {
  checkActiveItem: (id: string) => boolean;
  handleBlendAndIngredientUpdate: (
    value: FilterCriteriaValue,
    present: boolean,
  ) => void;
  optionSelectItems: any[];
  filterCriteria: FilterCriteriaOptions;
  checkExcludeIngredientIds?: (id: string) => boolean;
  focusOptionId?: string;
};

const OptionSelect = ({
  checkActiveItem = () => false,
  handleBlendAndIngredientUpdate = () => {},
  filterCriteria,
  optionSelectItems = [],
  checkExcludeIngredientIds = () => false,
  focusOptionId = "",
}: OptionSelectProps) => {
  const { recipeFilterByIngredientCategory, allIngredients } = useAppSelector(
    (state) => state?.ingredients,
  );
  // const [hoverRef, isHovered] = useHover();

  return (
    <div className={styles.optionSelectContainer}>
      <div className={styles.options}>
        {optionSelectItems?.length
          ? optionSelectItems?.map((item, index) => {
              const isSelected = checkActiveItem(item.id);
              const isIdExcluded = checkExcludeIngredientIds(item.id);
              return (
                <Chip
                  key={item?.id}
                  item={item}
                  filterCriteria={filterCriteria}
                  handleBlendAndIngredientUpdate={
                    handleBlendAndIngredientUpdate
                  }
                  isSelected={isSelected}
                  isIdExcluded={isIdExcluded}
                  focusOptionId={focusOptionId}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

const Chip = ({
  item,
  isSelected,
  filterCriteria,
  handleBlendAndIngredientUpdate,
  isIdExcluded,
  focusOptionId = "",
}) => {
  const [isChipHovered, setIsChipHovered] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${styles.signleItem} ${
        isSelected
          ? isIdExcluded
            ? styles.selectedPrimary
            : styles.selectedSecondary
          : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(
          updateFilterCriteriaItem({
            updateStatus: isSelected ? "focus" : "add",
            value: item,
            filterCriteria,
          }),
        );
      }}
      onMouseOver={() => setIsChipHovered(true)}
      onMouseOut={() => setIsChipHovered(false)}
    >
      <span
        className={`${
          item.id === focusOptionId
            ? isIdExcluded
              ? styles.activeColorPrimary
              : styles.activeColorSecondary
            : ""
        }`}
      >
        {item?.name}
      </span>
      {isSelected && (
        <div className={styles.tick}>
          {isChipHovered ? (
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles.ticked}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  updateFilterCriteriaItem({
                    updateStatus: "remove",
                    value: item,
                    filterCriteria,
                  }),
                );
                // handleBlendAndIngredientUpdate(filterCriteria, item);
              }}
            />
          ) : (
            <FontAwesomeIcon icon={faCircleCheck} className={styles.ticked} />
          )}
        </div>
      )}
    </div>
  );
};

export default OptionSelect;
