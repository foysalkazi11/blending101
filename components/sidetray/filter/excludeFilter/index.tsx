import React from "react";
import styles from "./ExcludeFilter.module.scss";
import {
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
  IngredientType,
} from "../../../../type/filterType";

interface Props {
  excludeFilterState: IngredientType;
  handleUpdateFilterCriteria: (obj: {
    filterCriteria?: FilterCriteriaOptions;
    value?: FilterCriteriaValue;
    updateStatus: FiltersUpdateCriteria;
  }) => void;
}

const ExcludeFilter = ({
  excludeFilterState,
  handleUpdateFilterCriteria,
}: Props) => {
  const { excludeIngredientIds, id = "" } = excludeFilterState;
  const handleIncludeExclude = (status: boolean) => {
    if (id) {
      handleUpdateFilterCriteria({
        updateStatus: "update",
        value: {
          ...excludeFilterState,
          excludeIngredientIds: status,
        },
        filterCriteria: "includeIngredientIds",
      });
    }
  };

  return (
    <div
      className={`${styles.tabContainer} ${
        excludeIngredientIds === undefined
          ? ""
          : excludeIngredientIds
          ? styles.activeTabContainerPrimary
          : styles.activeTabContainerSecondary
      }`}
    >
      <div
        className={`${styles.firstChild} ${
          excludeIngredientIds ? styles.activePrimary : ""
        }`}
        onClick={() => handleIncludeExclude(true)}
      >
        Without
      </div>

      <div
        className={`${styles.lastChild} ${
          excludeIngredientIds ? "" : styles.activeSecondary
        }`}
        onClick={() => handleIncludeExclude(false)}
      >
        With
      </div>
    </div>
  );
};

export default ExcludeFilter;
