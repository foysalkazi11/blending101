/* eslint-disable @next/next/no-img-element */
import React from "react";
import Cancel from "../../public/icons/cancel_black_24dp.svg";
import { useAppDispatch } from "../../redux/hooks";
import styles from "./searchtag.module.scss";
import {
  ActiveSectionType,
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
} from "../../type/filterType";

export type HandleUpdateActiveFilterTagType = (
  activeSection: ActiveSectionType,
  filterCriteria: FilterCriteriaOptions,
  activeTab: string,
  childTab?: string,
) => void;
export interface HandleUpdateFilterCriteriaType {
  filterCriteria?: FilterCriteriaOptions;
  value?: FilterCriteriaValue;
  updateStatus: FiltersUpdateCriteria;
}

interface TagType {
  item: FilterCriteriaValue;
  isIdExcluded: boolean;
  handleUpdateActiveFilterTag: HandleUpdateActiveFilterTagType;
  handleUpdateFilterCriteria: (obj: HandleUpdateFilterCriteriaType) => void;
}

interface searchtagsComponentProps {
  allFilters?: FilterCriteriaValue[];
  handleUpdateActiveFilterTag: HandleUpdateActiveFilterTagType;
  handleUpdateFilterCriteria: (obj: HandleUpdateFilterCriteriaType) => void;
}

export default function SearchtagsComponent({
  allFilters = [],
  handleUpdateActiveFilterTag,
  handleUpdateFilterCriteria,
}: searchtagsComponentProps) {
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
  return (
    <div className={styles.searchtab}>
      {allFilters?.length
        ? allFilters.map((filterItem) => {
            const { tagLabel, id } = filterItem;
            const checkExcludeId = checkExcludeIngredientIds(id);
            return (
              <FilterByTag
                key={id}
                item={filterItem}
                isIdExcluded={checkExcludeId}
                handleUpdateActiveFilterTag={handleUpdateActiveFilterTag}
                handleUpdateFilterCriteria={handleUpdateFilterCriteria}
              />
            );
          })
        : null}
    </div>
  );
}

const FilterByPicture = ({
  item,
  isIdExcluded = false,
  handleUpdateActiveFilterTag,
  handleUpdateFilterCriteria,
}: TagType) => {
  const dispatch = useAppDispatch();
  const isItemString = typeof item === "string";
  return (
    <div
      className={`${styles.item} ${
        isIdExcluded ? styles.activeItemPrimary : ""
      }`}
      onClick={() =>
        handleUpdateActiveFilterTag(
          item?.origin.activeSection,
          item?.origin?.filterCriteria,
          item?.origin?.activeTab,
          item?.origin?.childTab,
        )
      }
    >
      <div
        className={styles.cross}
        onClick={(e) => {
          e.stopPropagation();

          handleUpdateFilterCriteria({
            updateStatus: "remove",
            filterCriteria: isItemString ? "searchTerm" : item.filterCriteria,
            value: item,
          });
        }}
      >
        <Cancel className={styles.cancel} />
      </div>

      <div className={styles.image}>
        {/*  @ts-ignore */}
        <img src={item?.image} alt="img" />
      </div>
      <p>{item?.name}</p>
    </div>
  );
};

const FilterByTag = ({
  item,
  isIdExcluded = false,
  handleUpdateActiveFilterTag,
  handleUpdateFilterCriteria,
}: TagType) => {
  const isItemString = typeof item === "string";
  return (
    <div
      className={`${styles.item} ${
        isIdExcluded ? styles.activeItemPrimary : ""
      }`}
      style={{ minHeight: "35px" }}
      onClick={() =>
        handleUpdateActiveFilterTag(
          item?.origin.activeSection,
          item?.origin?.filterCriteria,
          item?.origin?.activeTab,
          item?.origin?.childTab,
        )
      }
    >
      <div
        className={styles.cross}
        onClick={(e) => {
          e.stopPropagation();

          handleUpdateFilterCriteria({
            updateStatus: "remove",
            filterCriteria: isItemString ? "searchTerm" : item.filterCriteria,
            value: item,
          });
        }}
      >
        <Cancel className={styles.cancel} />
      </div>

      {/*  @ts-ignore */}
      {item?.image && (
        <div className={styles.image}>
          {/*  @ts-ignore */}
          <img src={item?.image} alt="img" />
        </div>
      )}
      <p>{isItemString ? `Search | ${item}` : item?.tagLabel}</p>
    </div>
  );
};
