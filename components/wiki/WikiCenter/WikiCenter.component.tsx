/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./wikiCenter.module.scss";
import Image from "next/image";
import FiberManualRecordIcon from "../../../public/icons/fiber_manual_record_black_36dp.svg";
import CustomSlider from "../../../theme/carousel/carousel.component";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faAnglesDown } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import IngredientInfo from "./ingredientInfo/IngredientInfo";
import { GiGl } from "../../../type/nutrationType";
import { Portion, WikiType } from "../../../type/wikiListType";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setIsOpenWikiCommentsTray,
  setWikiCommentsCurrentIngredient,
} from "../../../redux/slices/wikiSlice";
import { faMessageDots as faMessageDotsSolid } from "@fortawesome/pro-solid-svg-icons";
import { faMessageDots as faMessageDotsLight } from "@fortawesome/pro-light-svg-icons";
import RenderJsonToHtml from "./jsonToHtml";
import {
  IngredientBookmarkListType,
  NutrientBookmarkListType,
} from "../../../type/wikiDetailsType";
import PanelHeader from "../../recipe/share/panelHeader/PanelHeader";
import ReadMore from "../../../theme/readMore";

interface WikiCenterComponentProps {
  heading?: string;
  name?: string;
  description?: string;
  categroy?: string;
  author?: string;
  coverImages?: string[];
  body?: any;
  giGl?: GiGl;
  type?: WikiType;
  wikiId?: string;
  commentsCount?: number;
  scrollPoint?: string;
  ingredientBookmarkList?: IngredientBookmarkListType[];
  nutrientBookmarkList?: NutrientBookmarkListType[];
  fetchNutritionPanelData?: (measureMentWeight: string, id: string) => void;
  setDefaultMeasureMentWeight?: Dispatch<SetStateAction<string>>;
  setCurrentWikiId?: Dispatch<SetStateAction<string>>;
  setPortions?: Dispatch<SetStateAction<any[]>>;
  originalPortions?: Portion[];
}

function WikiCenterComponent({
  author = "Author",
  body = "",
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
  scrollPoint = "",
  ingredientBookmarkList = [],
  nutrientBookmarkList = [],
  fetchNutritionPanelData = () => {},
  setCurrentWikiId = () => {},
  setDefaultMeasureMentWeight = () => {},
  setPortions = () => {},
  originalPortions: originalPortions = [],
}: WikiCenterComponentProps) {
  const [activeVariant, setActiveVariant] = useState(0);
  const [expandAllCollapse, setExpandAllCollapse] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpenWikiCommentsTray, wikiCommentsTrayCurrentWikiEntity } =
    useAppSelector((state) => state?.wiki);

  const openWikiCommentsTray = () => {
    if (!isOpenWikiCommentsTray) {
      dispatch(setIsOpenWikiCommentsTray(true));
    }
    dispatch(
      setWikiCommentsCurrentIngredient({
        ...wikiCommentsTrayCurrentWikiEntity,
        id: wikiId,
      }),
    );
  };

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
    <div className={styles.centerMain}>
      <PanelHeader
        icon={
          "/icons/information.svg"
          // <FontAwesomeIcon icon={faChartColumn} fontSize="24" />
        }
        title={`About ${type}`}
        rightSide={
          <IconWarper
            defaultBg="secondary"
            hover="bgSecondary"
            style={{ width: "28px", height: "28px" }}
            handleClick={() => router?.back()}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        }
      />

      <div className={styles.card}>
        <div className={styles.blendingRecipeHeading}>
          <h3>{name}</h3>
        </div>
        <div className={styles.blendingRecipeTopOptions}>
          <div className={styles.blendingTopLeft}>
            <div className={styles.tagItemBx}>
              <p>{categroy}</p>
            </div>
            <div className={styles.authorBx}>
              <div className={styles.dotDiv}>
                <FiberManualRecordIcon className={styles.dot} />
              </div>

              <div className={styles.authName}>{author}</div>
            </div>
          </div>

          <ul className={styles.recipeOptionsBtm}>
            <li>
              <div className={styles.bookmarkBtn}>
                <div className={styles.shareIcon}>
                  <Image
                    src={"/icons/share-alt-light-grey.svg"}
                    alt="Picture will load soon"
                    height={"10%"}
                    width={"10%"}
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
                <span className={styles.blshare}>Share</span>
              </div>
            </li>
            <li>
              <div
                className={styles.commentsIconBox}
                onClick={openWikiCommentsTray}
              >
                <FontAwesomeIcon
                  icon={commentsCount ? faMessageDotsSolid : faMessageDotsLight}
                  className={`${
                    commentsCount ? styles.activeIcon : styles.inActiveIcon
                  }`}
                />
                <p
                  className={`${styles.text} ${
                    commentsCount ? styles.activeIcon : styles.inActiveIcon
                  }`}
                >
                  {commentsCount}
                </p>
              </div>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faAnglesDown}
                className={` ${
                  expandAllCollapse ? styles.activeIcon : styles.inActiveIcon
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setExpandAllCollapse((prev) => !prev)}
              />
            </li>
          </ul>
        </div>
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
            <>
              <p
                onClick={() => updatePanel(0, wikiId)}
                className={`${styles.variantItem} ${
                  activeVariant === 0 ? styles.activeVariant : ""
                }`}
              >
                {name}
              </p>
              {nutrientBookmarkList
                .filter((variant) => !variant?.customBookmarkName)
                ?.map((variant, index) => {
                  return (
                    <p
                      onClick={() =>
                        updatePanel(index + 1, variant.nutrientId._id)
                      }
                      key={variant?.nutrientId?._id}
                      className={`${styles.variantItem} ${
                        activeVariant === index + 1 ? styles.activeVariant : ""
                      }`}
                    >
                      {variant?.nutrientId?.nutrientName}
                    </p>
                  );
                })}
            </>
          ) : null}

          {ingredientBookmarkList?.length ? (
            <>
              <p
                onClick={() => updatePanel(0, wikiId, originalPortions)}
                className={`${styles.variantItem} ${
                  activeVariant === 0 ? styles.activeVariant : ""
                }`}
              >
                {name}
              </p>
              {ingredientBookmarkList
                .filter((variant) => !variant?.customBookmarkName)
                ?.map((variant, index) => {
                  return (
                    <p
                      onClick={() =>
                        updatePanel(
                          index + 1,
                          variant?.ingredientId?._id,
                          variant?.ingredientId?.portions,
                        )
                      }
                      key={variant?.ingredientId?._id}
                      className={`${styles.variantItem} ${
                        activeVariant === index + 1 ? styles.activeVariant : ""
                      }`}
                    >
                      {variant?.ingredientId?.ingredientName}
                    </p>
                  );
                })}
            </>
          ) : null}
        </div>
        <div className={styles.wikiDescriptionBox}>
          <ReadMore>
            <p className={styles.textDis}>{description}</p>
          </ReadMore>
        </div>
      </div>
      {body ? (
        <RenderJsonToHtml
          blocks={JSON.parse(body)?.blocks}
          scrollPoint={scrollPoint}
          expandAllCollapse={expandAllCollapse}
        />
      ) : null}
    </div>
  );
}

export default WikiCenterComponent;
