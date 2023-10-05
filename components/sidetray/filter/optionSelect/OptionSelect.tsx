import React, { useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import styles from "./OptionSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import OptionSelectSkeleton from "../../../../theme/skeletons/optionSelectSkeleton/OptionSelectSkeleton";
import {
  ActiveFilterTagCriteriaType,
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
} from "../../../../type/filterType";

type OptionSelectProps = {
  checkActiveItem: (
    id: string,
    filterCriteria: FilterCriteriaOptions,
  ) => boolean;
  // handleBlendAndIngredientUpdate: (
  //   value: FilterCriteriaValue,
  //   present: boolean,
  // ) => void;
  optionSelectItems: any[];
  filterCriteria: FilterCriteriaOptions;
  checkExcludeIngredientIds?: (
    id: string,
    filterCriteria: FilterCriteriaOptions,
  ) => boolean;
  focusOptionId?: string;
  activeFilterTag: ActiveFilterTagCriteriaType;
  optionsLoading?: boolean;
  handleUpdateFilterCriteria: (obj: {
    filterCriteria?: FilterCriteriaOptions;
    value?: FilterCriteriaValue;
    updateStatus: FiltersUpdateCriteria;
  }) => void;
};

const OptionSelect = ({
  checkActiveItem = () => false,
  filterCriteria,
  optionSelectItems = [],
  checkExcludeIngredientIds = () => false,
  focusOptionId = "",
  activeFilterTag,
  optionsLoading = false,
  handleUpdateFilterCriteria,
}: OptionSelectProps) => {
  if (optionsLoading) {
    return <OptionSelectSkeleton />;
  }

  return (
    <div className={styles.optionSelectContainer}>
      <div className={styles.options}>
        {optionSelectItems?.length
          ? optionSelectItems?.map((item, index) => {
              const isSelected = checkActiveItem(item.id, filterCriteria);
              const isIdExcluded = checkExcludeIngredientIds(
                item.id,
                filterCriteria,
              );
              return (
                <Chip
                  key={item?.id}
                  item={item}
                  filterCriteria={filterCriteria}
                  isSelected={isSelected}
                  isIdExcluded={isIdExcluded}
                  focusOptionId={focusOptionId}
                  activeFilterTag={activeFilterTag}
                  handleUpdateFilterCriteria={handleUpdateFilterCriteria}
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
  isIdExcluded,
  focusOptionId = "",
  activeFilterTag = {},
  handleUpdateFilterCriteria,
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

        handleUpdateFilterCriteria({
          updateStatus: isSelected ? "focus" : "add",
          value: {
            ...item,
            origin: { ...activeFilterTag },
          },
          filterCriteria,
        });
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

                handleUpdateFilterCriteria({
                  updateStatus: "remove",
                  value: {
                    ...item,
                    origin: { ...activeFilterTag },
                  },
                  filterCriteria,
                });

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
