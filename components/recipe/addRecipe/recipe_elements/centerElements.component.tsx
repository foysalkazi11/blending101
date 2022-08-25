/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from "react";
import styles from "./centerElements.module.scss";
import ScoreTray from "./scoreTray/scoreTray.component";
import Image from "next/image";
import DropDown from "../../../../theme/dropDown/DropDown.component";
import HandleImageShow from "../../share/handleImageShow/HandleImageShow";
import { GiGl } from "../../../../type/nutrationType";
type CenterElementsProps = {
  images?: any[];
  setImages?: Dispatch<SetStateAction<any[]>>;
  setRecipeHeading?: Dispatch<SetStateAction<string>>;
  setDropDownState?: any;
  blendCategoryList: any;
  recipeTitle?: string;
  selectedBlendValueState: string;
  recipeDescription?: string;
  setRecipeDescription?: Dispatch<SetStateAction<string>>;
  recipePrepareTime?: number;
  setRecipePrepareTime?: Dispatch<SetStateAction<number>>;
  giGl?: GiGl;
};

const Center_Elements = ({
  images = [],
  setImages = () => {},
  recipeTitle = "",
  setRecipeHeading = () => {},
  setDropDownState,
  blendCategoryList,
  selectedBlendValueState,
  recipeDescription = "",
  setRecipeDescription = () => {},
  recipePrepareTime = 1,
  setRecipePrepareTime = () => {},
  giGl = {
    netCarbs: 0,
    totalGi: 0,
    totalGL: 0,
  },
}: CenterElementsProps) => {
  const adjusterFunc = (value) => {
    if (value < 1) {
      setRecipePrepareTime(1);
    } else {
      setRecipePrepareTime(value);
    }
  };

  let BlendtecItem = [
    { name: "Blendtec", value: "'Blendtec" },
    { name: "Blendtec", value: "Blendtec" },
  ];
  let OzItem = [
    { name: "64 oz", value: "64 oz" },
    { name: "64 oz", value: "64 oz" },
  ];
  let dropDownStyle = {
    paddingRight: "0px",
    width: "111%",
  };

  return (
    <div className={styles.main}>
      <div className={styles.recipeHeadig}>
        <span>
          <input
            value={recipeTitle}
            onChange={(e) => setRecipeHeading(e?.target?.value)}
            type="text"
            name="heading"
            placeholder="Recipe Heading"
          />
        </span>
      </div>
      <div className={styles.addImagediv}>
        <HandleImageShow setImages={setImages} images={images} />
      </div>
      <div className={styles.scoreTraydiv}>
        <div className={styles.scoreTraydiv__description}>
          <textarea
            value={recipeDescription}
            onChange={(e) => setRecipeDescription(e?.target?.value)}
            placeholder="Recipe descripation"
          />
        </div>
        <ScoreTray giGl={giGl} />

        <div className={styles.blendingOptions}>
          <div className={styles.blendingOptions__left}>
            <ul>
              <li>
                <div
                  className={styles.left__options}
                  style={{ minWidth: "125px" }}
                >
                  <DropDown
                    handleChange={(e) => setDropDownState(e?.target?.value)}
                    listElem={blendCategoryList?.map((item) => ({
                      name: item?.name,
                      value: item?._id,
                    }))}
                    value={selectedBlendValueState}
                  />
                </div>
              </li>
              <li>
                <div
                  className={styles.left__options}
                  style={{ minWidth: "115px" }}
                >
                  <DropDown
                    listElem={BlendtecItem}
                    value={BlendtecItem?.[0]?.value}
                    style={dropDownStyle}
                  />
                </div>
              </li>
              <li>
                <div
                  className={styles.left__options}
                  style={{ minWidth: "35px" }}
                >
                  <DropDown
                    listElem={OzItem}
                    value={OzItem?.[0]?.value}
                    style={dropDownStyle}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.blendingOptions__right}>
            <div className={styles.blendingOptions__right__options}>
              <span className={styles.text}>{recipePrepareTime}</span>
              <div className={styles.arrow}>
                <div className={styles.arrow_div}>
                  <Image
                    onClick={() => {
                      adjusterFunc(recipePrepareTime + 1);
                    }}
                    src={"/icons/dropdown.svg"}
                    alt="icon"
                    width={"17px"}
                    height={"15px"}
                    className={styles.reverse_arrow}
                  />
                  <Image
                    onClick={() => {
                      adjusterFunc(recipePrepareTime - 1);
                    }}
                    src={"/icons/dropdown.svg"}
                    alt="icon"
                    width={"17px"}
                    height={"15px"}
                    className={styles.original_arrow}
                  />
                </div>
              </div>
            </div>
            <span className={styles.timer_icon}>
              <Image
                src={"/icons/time-icon.svg"}
                alt="Picture will load soon"
                height={"20px"}
                width={"20px"}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Center_Elements;
