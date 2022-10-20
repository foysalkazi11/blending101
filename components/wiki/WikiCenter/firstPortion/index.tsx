import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react";
import styles from "../wikiCenter.module.scss";
import CustomSlider from "../../../../theme/carousel/carousel.component";
import { CoverImageType, WikiCenterComponentProps } from "..";
import TopHeader from "./TopHeader";
import SubHeader from "./SubHeader";
import { Portion } from "../../../../type/wikiListType";
import IngredientInfo from "./ingredientInfo/IngredientInfo";
import NutrientBookmarkList from "./NutrientBookmarkList";
import IngredientBookmarkList from "./IngredientBookmarkList";
import ReadMore from "../../../../theme/readMore";
import { BlockType } from "../../../../type/editorjsBlockType";
import { placeHolderImage } from "../../wikiSingleItem/WikiSingleItem";
import Image from "next/image";

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
  imagesWithinBlock = [],
}: WikiCenterComponentProps & {
  expandAllCollapse?: boolean;
  setExpandAllCollapse?: Dispatch<SetStateAction<boolean>>;
  imagesWithinBlock?: CoverImageType[];
}) => {
  const [activeVariant, setActiveVariant] = useState<number>(0);
  const captionRef = useRef<HTMLDivElement>(null);
  const imageSliderContainerRef = useRef<HTMLDivElement>(null);
  let timer = useRef(null);

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

  const findImageBlock = (id: string) => {
    if (!id) {
      return;
    }
    setExpandAllCollapse(true);

    let titleElement = null;
    timer.current = setTimeout(() => {
      titleElement = document.getElementById(id);
      titleElement?.scrollIntoView({ behavior: "smooth" });
      titleElement.style.backgroundColor = "#d2e7bc";
      // titleElement.style.backgroundColor = "";
    }, 300);
    timer.current = setTimeout(() => {
      titleElement.style.backgroundColor = "";
    }, 2500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

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
          {imagesWithinBlock?.length ? (
            imagesWithinBlock.map((img, index) => {
              return (
                <div
                  key={index}
                  className={styles.imageSliderContainer}
                  ref={imageSliderContainerRef}
                >
                  <div
                    className={styles.bgBlurImage}
                    style={{ backgroundImage: `url(${img.url})` }}
                  ></div>

                  <Image
                    src={img.url}
                    alt="coverImage"
                    layout="fill"
                    objectFit="contain"
                  />
                  {img?.caption && (
                    <div
                      className={styles.imageCaption}
                      // style={{
                      //   top: `${
                      //     imageSliderContainerRef?.current?.getBoundingClientRect()
                      //       ?.height -
                      //     (captionRef?.current?.getBoundingClientRect()
                      //       ?.height +
                      //       32)
                      //   }px`,
                      // }}
                    >
                      <p
                        className={styles.captionText}
                        ref={captionRef}
                        onClick={() => findImageBlock(img?.id)}
                      >
                        {img?.caption}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <img src={placeHolderImage} alt="coverImage" />
          )}
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
