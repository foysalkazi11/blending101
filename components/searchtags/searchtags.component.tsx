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
  return (
    <div className={styles.searchtab}>
      {allFilters?.length
        ? allFilters.map((filterItem) => {
            const { tagLabel } = filterItem;
            return tagLabel ? (
              <FilterByTag key={filterItem?.id} item={filterItem} />
            ) : (
              <FilterByPicture key={filterItem?.id} item={filterItem} />
            );
          })
        : null}
    </div>
  );
}

const FilterByPicture = ({ item }: { item: FilterCriteriaValue }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.item}>
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

const FilterByTag = ({ item }: { item: FilterCriteriaValue }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.item} style={{ minHeight: "35px" }}>
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
