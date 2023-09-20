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
import { NextImageWithFallback } from "theme/imageWithFallback";
import SlickSlider, { SmipleNextArrow, SmiplePrevArrow } from "theme/carousel/SlickSlider";

const responsiveSetting = {
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

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
  isIdExcluded?: boolean;
  handleUpdateActiveFilterTag: HandleUpdateActiveFilterTagType;
  handleUpdateFilterCriteria: (obj: HandleUpdateFilterCriteriaType) => void;
}

interface searchtagsComponentProps {
  allFilters?: FilterCriteriaValue[];
  handleUpdateActiveFilterTag: HandleUpdateActiveFilterTagType;
  handleUpdateFilterCriteria: (obj: HandleUpdateFilterCriteriaType) => void;
}

const ModifySliderPrevArrow = (props) => {
  const { style, className, ...rest } = props;

  return (
    <SmiplePrevArrow {...rest} style={{ ...style, left: "-2.5rem" }} className={`${className} slickArrowSize_md`} />
  );
};
const ModifySliderNestArrow = (props) => {
  const { style, className, ...rest } = props;

  return (
    <SmipleNextArrow {...rest} style={{ ...style, right: "-2.5rem" }} className={`${className} slickArrowSize_md`} />
  );
};

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
    <div className={`${styles.searchtab}`}>
      {allFilters?.length ? (
        <SlickSlider
          moreSetting={responsiveSetting}
          nextArrow={<ModifySliderNestArrow />}
          prevArrow={<ModifySliderPrevArrow />}
        >
          {allFilters.map((filterItem) => {
            const { tagLabel, id } = filterItem;
            //@ts-ignore

            //checkExcludeIngredientIds(id);
            return (
              <FilterByTag
                key={id}
                item={filterItem}
                handleUpdateActiveFilterTag={handleUpdateActiveFilterTag}
                handleUpdateFilterCriteria={handleUpdateFilterCriteria}
              />
            );
          })}
        </SlickSlider>
      ) : null}
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
      className={`${styles.item} ${isIdExcluded ? styles.activeItemPrimary : ""}`}
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

const FilterByTag = ({ item, handleUpdateActiveFilterTag, handleUpdateFilterCriteria }: TagType) => {
  //@ts-ignore
  const checkExcludeId = item?.excludeIngredientIds;
  const isItemString = typeof item === "string";
  return (
    <div
      className={`${styles.item} ${checkExcludeId && styles.activeItemPrimaryDesktop}`}
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
        className={`${styles.cross} `}
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
        <div className={`${styles.image} ${checkExcludeId && styles.activeItemPrimaryMobile}`}>
          {/*  @ts-ignore */}
          <NextImageWithFallback
            src={item?.image}
            alt={"img"}
            fallbackSrc="/food/chard.png"
            width={35}
            height={35}
            style={{ objectFit: "contain" }}
          />
          {/* <img src={item?.image} alt="img" /> */}
        </div>
      )}
      <p className={`${styles.text} truncate line-clamp-two ${!item?.image && styles?.noImageTextHight}`}>
        <span className={styles.preText}>{`${item?.origin?.activeTab} | `}</span>
        {isItemString ? `Search | ${item}` : item?.tagLabel}
      </p>
    </div>
  );
};
