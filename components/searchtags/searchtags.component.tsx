/* eslint-disable @next/next/no-img-element */
import React from "react";
import Cancel from "../../public/icons/cancel_black_24dp.svg";
import { useAppDispatch } from "../../redux/hooks";

import styles from "./searchtag.module.scss";
import {
  FilterCriteriaValue,
  updateFilterCriteriaItem,
} from "../../redux/slices/filterRecipeSlice";

interface searchtagsComponentProps {
  allFilters?: FilterCriteriaValue[];
}

export default function SearchtagsComponent({
  allFilters = [],
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
            return tagLabel ? (
              <FilterByTag
                key={id}
                item={filterItem}
                isIdExcluded={checkExcludeId}
              />
            ) : (
              <FilterByPicture
                key={id}
                item={filterItem}
                isIdExcluded={checkExcludeId}
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
}: {
  item: FilterCriteriaValue;
  isIdExcluded: boolean;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${styles.item} ${
        isIdExcluded ? styles.activeItemPrimary : ""
      }`}
    >
      <div
        className={styles.cross}
        onClick={() => {
          dispatch(
            updateFilterCriteriaItem({
              updateStatus: "remove",
              filterCriteria: item.filterCriteria,
              value: item,
            }),
          );
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
}: {
  item: FilterCriteriaValue;
  isIdExcluded: boolean;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${styles.item} ${
        isIdExcluded ? styles.activeItemPrimary : ""
      }`}
      style={{ minHeight: "35px" }}
    >
      <div
        className={styles.cross}
        onClick={() => {
          dispatch(
            updateFilterCriteriaItem({
              updateStatus: "remove",
              filterCriteria: item.filterCriteria,
              value: item,
            }),
          );
        }}
      >
        <Cancel className={styles.cancel} />
      </div>

      <p>{item.tagLabel}</p>
    </div>
  );
};
