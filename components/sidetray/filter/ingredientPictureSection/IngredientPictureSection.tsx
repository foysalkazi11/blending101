import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction } from "react";
import InputComponent from "../../../../theme/input/input.component";
import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import styles from "../filter.module.scss";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";
import SkeletonBlendType from "../../../../theme/skeletons/skeletonBlendType/SkeletonBlendType";

interface Props {
  searchInput?: string;
  setSearchInput?: Dispatch<SetStateAction<string>>;
  ingredientCategory?: string;
  loading?: boolean;
  searchIngredientData?: any[];
  scrollAreaMaxHeight?: React.CSSProperties;
  handleIngredientClick?: (item: any, exist: boolean) => void;
  checkActiveIngredient?: (arg: any) => boolean;
}

const IngredientPictureSection = ({
  ingredientCategory = "",
  searchInput = "",
  setSearchInput = () => {},
  loading = false,
  searchIngredientData = [],
  handleIngredientClick = () => {},
  checkActiveIngredient = () => false,
  scrollAreaMaxHeight = { maxHeight: "350px" },
}: Props) => {
  return (
    <div>
      {ingredientCategory === "All" && (
        <InputComponent
          borderSecondary={true}
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
        <SkeletonBlendType amount={16} />
      ) : (
        <>
          <div className={`${styles.ingredientContainer} y-scroll`}>
            {searchIngredientData
              ? searchIngredientData?.map((item, i) => (
                  <div
                    key={item?.ingredientName + i}
                    className={styles.item}
                    onClick={() =>
                      handleIngredientClick(
                        item,
                        checkActiveIngredient(item?._id),
                      )
                    }
                  >
                    <div className={styles.image}>
                      <img
                        src={item?.featuredImage || "/food/chard.png"}
                        alt={item?.ingredientName}
                      />
                      {checkActiveIngredient(item?._id) && (
                        <div className={styles.tick}>
                          <CheckCircle className={styles.ticked} />
                        </div>
                      )}
                    </div>

                    <p>{item?.ingredientName}</p>
                  </div>
                ))
              : null}
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientPictureSection;
