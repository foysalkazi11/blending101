import React from "react";
import { BsArrowRepeat, BsChevronLeft } from "react-icons/bs";
import styles from "./OptionSelect.module.scss";
import {
  ActiveSectionType,
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
} from "../../../../type/filterType";

type OptionSelectHeaderProps = {
  activeTab: string;
  filterCriteria: any;
  handleUpdateFilterCriteria: (obj: {
    filterCriteria?: FilterCriteriaOptions;
    value?: FilterCriteriaValue;
    updateStatus: FiltersUpdateCriteria;
  }) => void;
  handleUpdateActiveFilterTag: (
    activeSection: ActiveSectionType,
    filterCriteria: FilterCriteriaOptions,
    activeTab: string,
    childTab?: string,
  ) => void;
};

const OptionSelectHeader = ({
  activeTab,
  filterCriteria,
  handleUpdateFilterCriteria,
  handleUpdateActiveFilterTag,
}: OptionSelectHeaderProps) => {
  return (
    <div className={styles.optionSelectHeaderContainer}>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <div
            className={styles.icon}
            onClick={() => handleUpdateActiveFilterTag("tags", null, "", "")}
          >
            <BsChevronLeft />
          </div>
          <h3>{activeTab}</h3>
        </div>
        <div
          className={styles.rightSide}
          onClick={() =>
            handleUpdateFilterCriteria({
              filterCriteria,
              updateStatus: "removeAll",
            })
          }
        >
          <BsArrowRepeat />
        </div>
      </div>
      <input className={styles.optionSelectInput} placeholder="Search" />
    </div>
  );
};

export default OptionSelectHeader;
