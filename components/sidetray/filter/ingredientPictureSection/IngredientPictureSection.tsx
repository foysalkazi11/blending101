import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction } from "react";
import InputComponent from "../../../../theme/input/input.component";
import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import styles from "../filter.module.scss";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";
import SkeletonBlendType from "../../../../theme/skeletons/skeletonBlendType/SkeletonBlendType";
import useWindowSize from "../../../utility/useWindowSize";
import { FilterCriteriaValue } from "../../../../type/filterType";
import { ImageWithFallback, NextImageWithFallback } from "../../../../theme/imageWithFallback";

interface Props {
  searchInput?: string;
  setSearchInput?: Dispatch<SetStateAction<string>>;
  ingredientCategory?: string;
  loading?: boolean;
  searchIngredientData?: any[];
  scrollAreaMaxHeight?: number;
  checkActiveItem: (id: string) => boolean;
  handleBlendAndIngredientUpdate: (
    value?: any | FilterCriteriaValue,
    present?: boolean,
    extraInfo?: any | FilterCriteriaValue,
  ) => void;
}

const IngredientPictureSection = ({
  ingredientCategory = "",
  searchInput = "",
  setSearchInput = () => {},
  loading = false,
  searchIngredientData = [],
  checkActiveItem = () => false,
  handleBlendAndIngredientUpdate = () => {},
  scrollAreaMaxHeight,
}: Props) => {
  const { height } = useWindowSize();
  if (!scrollAreaMaxHeight) {
    scrollAreaMaxHeight = height - 350;
  }

  return (
    <div>
      {ingredientCategory === "All" && (
        <InputComponent
          border="borderSecondary"
          style={{
            padding: "10px",
            fontSize: "12px",
            borderRadius: "10px",
          }}
          inputWithIcon={true}
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} fontSize="16" />}
          placeholder="Search ingredient"
          value={searchInput}
          onChange={(e) => setSearchInput(e?.target?.value)}
        />
      )}

      {loading ? (
        <SkeletonBlendType amount={16} style={{ maxHeight: `${scrollAreaMaxHeight}px` }} />
      ) : (
        <>
          {searchIngredientData.length ? (
            <div className={`${styles.ingredientContainer} y-scroll`} style={{ maxHeight: `${scrollAreaMaxHeight}px` }}>
              {searchIngredientData?.map((item, i) => (
                <div
                  key={item?.ingredientName + i}
                  className={styles.item}
                  onClick={() =>
                    handleBlendAndIngredientUpdate(item, checkActiveItem(item?._id), {
                      id: item?._id,
                      image: item?.featuredImage || "/food/chard.png",
                      name: item?.ingredientName,
                      tagLabel: `Ingredient | ${item?.ingredientName}`,
                      filterCriteria: "includeIngredientIds",
                      origin: {
                        activeSection: "visual",
                        filterCriteria: "includeIngredientIds",
                        activeTab: "Ingredients",
                        childTab: item?.ingredientName || "",
                      },
                    })
                  }
                >
                  <div className={styles.image}>
                    <NextImageWithFallback
                      src={item?.featuredImage || "/food/chard.png"}
                      alt={item?.ingredientName}
                      fallbackSrc="/food/chard.png"
                      width={60}
                      height={50}
                      loading="lazy"
                    />
                    {checkActiveItem(item?._id) && (
                      <div className={styles.tick}>
                        <CheckCircle className={styles.ticked} />
                      </div>
                    )}
                  </div>

                  <p>{item?.ingredientName}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResult}>
              <p>No Ingredients</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IngredientPictureSection;
