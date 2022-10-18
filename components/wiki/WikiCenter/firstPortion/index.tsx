import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../wikiCenter.module.scss";
import CustomSlider from "../../../../theme/carousel/carousel.component";
import { WikiCenterComponentProps } from "..";
import TopHeader from "./TopHeader";
import SubHeader from "./SubHeader";
import { Portion } from "../../../../type/wikiListType";
import IngredientInfo from "./ingredientInfo/IngredientInfo";
import NutrientBookmarkList from "./NutrientBookmarkList";
import IngredientBookmarkList from "./IngredientBookmarkList";
import ReadMore from "../../../../theme/readMore";

const FirstPortion = ({
  author = "Author",
  categroy = "Categroy",
  coverImages = [],
  heading = "About Heading",
  name = "Name",
  description = "",
  giGl = {
    netCarbs: 0,
    totalGi: 0,
    totalGL: 0,
  },
  type = "Ingredient",
  wikiId = "",
  commentsCount = 0,
  ingredientBookmarkList = [],
  nutrientBookmarkList = [],
  fetchNutritionPanelData = () => {},
  setCurrentWikiId = () => {},
  setDefaultMeasureMentWeight = () => {},
  setPortions = () => {},
  originalPortions: originalPortions = [],
  expandAllCollapse = true,
  setExpandAllCollapse = () => {},
}: WikiCenterComponentProps & {
  expandAllCollapse?: boolean;
  setExpandAllCollapse?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [activeVariant, setActiveVariant] = useState<number>(0);

  const updatePanel = (index: number, id: string, portions?: Portion[]) => {
    if (type === "Nutrient") {
      setActiveVariant(index);
      setCurrentWikiId(id);
    }
    if (type === "Ingredient") {
      const defaultMeasureMentWeight = portions?.find((item) => item?.default);
      setPortions(portions);
      setCurrentWikiId(id);
      setDefaultMeasureMentWeight(defaultMeasureMentWeight?.meausermentWeight);
      setActiveVariant(index);
      fetchNutritionPanelData(defaultMeasureMentWeight?.meausermentWeight, id);
    }
  };

  return (
    <>
      <TopHeader type={type} />

      <div className={styles.card}>
        <div className={styles.blendingRecipeHeading}>
          <h3>{name}</h3>
        </div>
        <SubHeader
          wikiId={wikiId}
          author={author}
          categroy={categroy}
          commentsCount={commentsCount}
          expandAllCollapse={expandAllCollapse}
          setExpandAllCollapse={setExpandAllCollapse}
        />
        <CustomSlider>
          {coverImages?.length
            ? coverImages.map((img, index) => {
                return (
                  <div
                    key={index}
                    className={styles.imageBox}
                    //style={{ backgroundImage: `url(${img})` }}
                  >
                    <img src={img} alt="coverImage" />
                  </div>
                );
              })
            : null}
        </CustomSlider>
        {type === "Ingredient" && (
          <div className={styles.ingredientInfoContainer}>
            <IngredientInfo borderRight={true} />
            <IngredientInfo
              borderRight={true}
              text="Glycemic Index"
              amount={Math?.round(giGl?.totalGi)}
            />
            <IngredientInfo
              borderRight={true}
              text="Glycemic Load"
              amount={Math?.round(giGl?.totalGL)}
            />
            <IngredientInfo amount={240} text="Nutri Score" />
          </div>
        )}
        <div className={styles.variantContainer}>
          {nutrientBookmarkList?.length ? (
            <NutrientBookmarkList
              updatePanel={updatePanel}
              wikiId={wikiId}
              activeVariant={activeVariant}
              name={name}
              nutrientBookmarkList={nutrientBookmarkList}
            />
          ) : null}

          {ingredientBookmarkList?.length ? (
            <IngredientBookmarkList
              updatePanel={updatePanel}
              wikiId={wikiId}
              activeVariant={activeVariant}
              ingredientBookmarkList={ingredientBookmarkList}
              name={name}
              originalPortions={originalPortions}
            />
          ) : null}
        </div>
        <div className={styles.wikiDescriptionBox}>
          <ReadMore>
            <p className={styles.textDis}>{description}</p>
          </ReadMore>
        </div>
      </div>
    </>
  );
};

export default FirstPortion;
