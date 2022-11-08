/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useRef } from "react";
import styles from "./dataCard.module.scss";
import MoreVertIcon from "../../../public/icons/more_vert_black_36dp.svg";
import { slicedString } from "../../../services/string.service";
import { useRouter } from "next/router";
import useChangeCompare from "../../../customHooks/useChangeComaper";
import { MdOutlineEdit } from "react-icons/md";
import useForAddToCollection from "../../../customHooks/useForAddToCollection";
import useForOpenCollectionTray from "../../../customHooks/useForOpenCollection";
import useForOpenCommentsTray from "../../../customHooks/useForOpenCommentsTray";
import useForSelectCommentsAndNotesIcon from "../../../customHooks/useForSelectCommentsAndNotesIcon";
import IconWarper from "../../iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import Tooltip from "../../toolTip/CustomToolTip";
import { RecipeCreatorInfo } from "../../../type/recipeType";

interface dataCardInterface {
  title: string;
  ingredients: string;
  category: string;
  ratings: number;
  noOfRatings: number;
  carbs: number;
  score: number;
  calorie: number;
  noOfComments: number;
  image: string;
  recipeId?: string;
  notes?: number;
  addedToCompare?: boolean;
  compareRecipeList?: any[];
  setcompareRecipeList?: (state: any) => void;
  showMoreMenu?: boolean;
  showOptionalEditIcon?: boolean;
  changeToFormulateRecipe?: () => void;
  isCollectionIds?: string[] | null;
  setOpenCollectionModal?: Dispatch<SetStateAction<boolean>>;
  postfixTitle?: string;
  isMatch?: boolean;
  isImageOverlay?: boolean;
  imageOverlayFunc?: (arg: string) => void;
  userId?: null | RecipeCreatorInfo;
  customMenu?: React.ReactNode | null;
}

export default function DatacardComponent({
  title,
  ingredients,
  category,
  ratings,
  noOfRatings,
  carbs,
  score,
  calorie,
  noOfComments,
  image,
  recipeId = "",
  notes = 0,
  addedToCompare = false,
  compareRecipeList = [],
  setcompareRecipeList = () => {},
  showMoreMenu = true,
  showOptionalEditIcon = false,
  changeToFormulateRecipe = () => {},
  isCollectionIds = [] || null,
  setOpenCollectionModal = () => {},
  imageOverlayFunc = () => {},
  postfixTitle = "",
  isMatch = false,
  isImageOverlay = false,
  userId = null,
  customMenu = null,
}: dataCardInterface) {
  title = title || "Triple Berry Smoothie";
  ingredients = ingredients;
  category = category || "Smoothie";
  noOfRatings = noOfRatings || 0;
  carbs = carbs || 23;
  calorie = calorie || 270;
  score = score || 701;
  noOfComments = noOfComments || 0;
  image = image || "/cards/juice.png";
  ratings = Math.ceil(ratings);
  const menu = useRef<any>();
  const router = useRouter();
  const handleChangeCompare = useChangeCompare();
  const handleAddToCollection = useForAddToCollection();
  const handleOpenCollectionTray = useForOpenCollectionTray();
  const handleOpenCommentsTray = useForOpenCommentsTray();
  const selectCommentsAndNotesIcon = useForSelectCommentsAndNotesIcon();

  const handleClick = () => {
    const elem = menu.current;
    elem.classList.toggle("show__hidden");
  };

  const FloatingMenu2 = () => {
    return (
      <div className={styles.floating__menu2}>
        <ul>
          <li onClick={changeToFormulateRecipe}>
            <MdOutlineEdit className={styles.icon} />
          </li>
        </ul>
      </div>
    );
  };

  const DataBody = () => (
    <div className={styles.databody}>
      <div className={styles.databody__top}>
        <div className={styles.databody__top__label}>
          <div className={styles.category}>{category}</div>
          {showOptionalEditIcon ? <FloatingMenu2 /> : false}
        </div>
        <div className={styles.databody__top__info}>
          {noOfRatings ? (
            <>
              <img src="/icons/star.svg" alt="star" />
              <span>{ratings}</span>&nbsp;
              <span>({noOfRatings})</span>
            </>
          ) : null}
        </div>
      </div>
      <div className={styles.databody__bottom}>
        <p>{slicedString(ingredients, 0, 12)}</p>
      </div>
    </div>
  );

  const FloatingMenu = () => (
    <div className={styles.floating__menu} ref={menu}>
      <ul>
        <li>
          <img src="/icons/square.png" alt="square" />
        </li>
        <li>
          <img src="/icons/share.png" alt="square" />
        </li>
        <li>
          <img src="/icons/edit.png" alt="square" />
        </li>
        <li>
          <img src="/icons/calender.png" alt="square" />
        </li>
        <li>
          <img src="/icons/cart.png" alt="square" />
        </li>
      </ul>
    </div>
  );

  const hangleShowCommentsAndNotesIcon = (comments: number, notes: number) => {
    const res = selectCommentsAndNotesIcon(comments, notes);
    return (
      <>
        <img
          src={`/icons/${res?.icon}.svg`}
          alt="icon"
          onClick={(e) => handleOpenCommentsTray(recipeId, title, image, e)}
        />{" "}
        <span style={{ color: res?.amount ? "#7cbc39" : "#c4c4c4" }}>
          {res?.amount}
        </span>
      </>
    );
  };

  return (
    <div className={styles.datacard}>
      <div className={styles.datacard__inner}>
        <div className={styles.heading}>
          <div className={styles.title}>
            <h2
              onClick={(e) => {
                e?.stopPropagation();
                router.push(`/recipe_details/${recipeId}`);
              }}
            >
              {title}
              {isMatch ? "" : <span>{` (${postfixTitle})`}</span>}
            </h2>
          </div>
          <div className={styles.menu}>
            {showMoreMenu && (
              <>
                {customMenu ? (
                  customMenu
                ) : (
                  <>
                    <IconWarper
                      hover="bgSlightGray"
                      handleClick={handleClick}
                      style={{ width: "30px", height: "30px" }}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </IconWarper>
                    <FloatingMenu />
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.datacard__body__middle}>
          <div className={styles.datacard__body__middle__left}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
            >
              {isImageOverlay ? (
                <div className={styles.imageOverlay}>
                  <img
                    src="/images/black-add.svg"
                    alt="add icon"
                    onClick={() => imageOverlayFunc(image)}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.datacard__body__middle__right}>
            <DataBody />
          </div>
        </div>
        <div className={styles.datacard__body__belt}>
          <div className={styles.datacard__body__belt__child}>
            Net Carbs <span>{carbs}</span>
          </div>
          <div className={styles.datacard__body__belt__child}>
            Rx Score <span>{score}</span>
          </div>
          <div className={styles.datacard__body__belt__child}>
            Calorie <span>{calorie}</span>
          </div>
        </div>
        <div className={styles.datacard__body__bottom}>
          <div className={styles.datacard__body__bottom__left}>
            {userId ? (
              <Tooltip
                content={
                  userId?.displayName ||
                  userId?.firstName ||
                  userId?.lastName ||
                  userId?.email ||
                  "User name"
                }
                direction="right"
              >
                {userId?.image ? (
                  <img
                    className={styles.user}
                    src={userId?.image}
                    alt="brand"
                  />
                ) : (
                  <div className={styles.userIcon}>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                )}
              </Tooltip>
            ) : (
              <img
                className={styles.brand}
                src="/icons/delish.png"
                alt="brand"
              />
            )}
          </div>
          <div className={styles.datacard__body__bottom__right}>
            <ul>
              <li>
                <img
                  src={
                    addedToCompare
                      ? "/icons/compare-1.svg"
                      : "/icons/eclipse.svg"
                  }
                  alt="icon"
                  onClick={(e) =>
                    handleChangeCompare(
                      e,
                      recipeId,
                      addedToCompare ? false : true,
                      compareRecipeList,
                      setcompareRecipeList,
                    )
                  }
                />
              </li>
              <li>
                <img
                  src={
                    isCollectionIds?.length
                      ? "/icons/compare.svg"
                      : "/images/BookmarksStar.svg"
                  }
                  alt="compare"
                  onClick={(e) =>
                    isCollectionIds?.length
                      ? handleOpenCollectionTray(recipeId, isCollectionIds, e)
                      : handleAddToCollection(
                          recipeId,
                          setOpenCollectionModal,
                          e,
                          setcompareRecipeList,
                        )
                  }
                />
              </li>
              <li>{hangleShowCommentsAndNotesIcon(noOfComments, notes)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
