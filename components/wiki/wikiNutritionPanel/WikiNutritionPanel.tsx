import { useQuery } from "@apollo/client";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import GET_ALL_BLEND_NUTRIENTS_CATEGORIES from "../../../gqlLib/nutrition/query/getAllBlendNutrientCategory";
import CheckIcon from "../../../theme/checkIcon/CheckIcon";
import DropDown from "../../../theme/dropDown/DropDown.component";
import InputComponent from "../../../theme/input/input.component";
import NutritionListSkeleton from "../../../theme/skeletons/nutritionListSkeleton/NutritionListSkeleton";
import s from "./WikiNutritionPanel.module.scss";
import GET_ALL_BLEND_NUTRIENTS_FOR_WIKI from "gqlLib/nutrition/query/getAllBlendNutrientsForWiki";

interface List {
  nutrientName: string;
  _id: string;
  category: {
    _id: string;
  };
}

type Props = {
  handleNutritionClick?: (item: any, exist: boolean, extraInfo?: any) => void;
  checkActiveNutrition?: (arg: any) => boolean;
  showHeader?: boolean;
  scrollAreaMaxHeight?: number;
};

const WikiNutritionPanel = ({
  checkActiveNutrition = () => false,
  handleNutritionClick = () => {},
  showHeader = true,
  scrollAreaMaxHeight = 500,
}: Props) => {
  const [nutrientCategory, setNutrientCategory] = useState<{ name: string; value: string }[]>([
    { name: "All", value: "all" },
  ]);
  const [selectedNutrientCategory, setSelectedNutrientCategory] = useState<string>("all");
  const [searchInput, setSearchInput] = useState("");
  const [nutrientList, setNutrientList] = useState<List[]>([]);
  const isMounted = useRef(false);
  const {
    data: nutrientDataForWiki,
    loading: nutrientLoadingForWiki,
    error: nutrientError,
  } = useQuery(GET_ALL_BLEND_NUTRIENTS_FOR_WIKI);
  const {
    data: nutrientCategoryData,
    loading: nutrientCategoryLoading,
    error: nutrientCategoryError,
  } = useQuery(GET_ALL_BLEND_NUTRIENTS_CATEGORIES);

  useEffect(() => {
    if (!nutrientCategoryLoading && nutrientCategoryData?.getAllBlendNutrientCategories) {
      const data = nutrientCategoryData?.getAllBlendNutrientCategories?.map((item) => ({
        name: item?.categoryName,
        value: item?._id,
      }));
      setNutrientCategory([{ name: "All", value: "all" }, ...data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nutrientCategoryData?.getAllBlendNutrientCategories, nutrientCategoryLoading]);

  useEffect(() => {
    if (!nutrientLoadingForWiki && nutrientDataForWiki?.getAllBlendNutrientsForWiki) {
      setNutrientList(nutrientDataForWiki?.getAllBlendNutrientsForWiki);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nutrientDataForWiki?.getAllBlendNutrientsForWiki, nutrientLoadingForWiki]);

  useEffect(() => {
    if (isMounted.current) {
      if (searchInput === "") {
        setNutrientList(nutrientDataForWiki?.getAllBlendNutrientsForWiki);
      } else {
        const filter = nutrientDataForWiki?.getAllBlendNutrientsForWiki?.filter((item: List) =>
          item?.nutrientName?.toLowerCase()?.includes(searchInput?.toLowerCase()),
        );
        setNutrientList(filter);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const UpdateNutritionCategory = (selectedNutrientCategory) => {
    setSelectedNutrientCategory(selectedNutrientCategory);
    if (!selectedNutrientCategory || selectedNutrientCategory === "all") {
      setNutrientList(nutrientDataForWiki?.getAllBlendNutrientsForWiki);
    } else {
      const filter = nutrientDataForWiki?.getAllBlendNutrientsForWiki?.filter(
        (item: List) => item?.category?._id === selectedNutrientCategory,
      );
      setNutrientList(filter);
    }
    handleNutritionClick("", false, {
      category: nutrientCategory?.find((cat) => cat?.value === selectedNutrientCategory)?.name,
    });
  };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     if (!selectedNutrientCategory ) {
  //       setNutrientList(nutrientData?.getAllBlendNutrients);
  //     } else {
  //       const filter = nutrientData?.getAllBlendNutrients?.filter(
  //         (item: List) => item?.category?._id === selectedNutrientCategory,
  //       );
  //       setNutrientList(filter);
  //     }
  //     handleNutritionClick("", false, { category: selectedNutrientCategory });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedNutrientCategory]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={s.wikiNutritionPanelContainer}>
      {showHeader && (
        <>
          <h3 className={s.title}>Nutrition List</h3>
          <div className={s.borderBottom}></div>
        </>
      )}

      <div className={s.dropdown}>
        <DropDown
          value={selectedNutrientCategory}
          listElem={nutrientCategory}
          onChange={(e) => UpdateNutritionCategory(e?.target?.value)}
          border="borderSecondary"
        />
      </div>
      {(!selectedNutrientCategory || selectedNutrientCategory === "all") && (
        <div className={s.dropdown}>
          <InputComponent
            border="borderSecondary"
            // style={{ padding: "10px", fontSize: "12px", borderRadius: "10px" }}
            inputWithIcon={true}
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            placeholder="Search Nutrition"
            value={searchInput}
            onChange={(e) => setSearchInput(e?.target?.value)}
          />
        </div>
      )}

      <div className={`${s.nutrientListWarper} y-scroll`} style={{ maxHeight: `${scrollAreaMaxHeight}px` }}>
        {nutrientLoadingForWiki ? (
          <NutritionListSkeleton />
        ) : (
          nutrientList?.map((item, index) => {
            return (
              <p
                key={index}
                className={s.text}
                onClick={() => handleNutritionClick(item, checkActiveNutrition(item?._id))}
              >
                {item?.nutrientName}
                {checkActiveNutrition(item?._id) && (
                  <CheckIcon style={{ position: "absolute", top: "0px", right: "5px" }} />
                )}
              </p>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WikiNutritionPanel;
