/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from "react";
import styles from "./dataCard.module.scss";
import MoreVertIcon from "../../../public/icons/more_vert_black_36dp.svg";
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
import {
  RecipeCreatorInfo,
  RecipeSmallVersionType,
  ReferenceOfRecipeUpdateFuncType,
} from "../../../type/recipeType";
import useHover from "../../../components/utility/useHover";
import { faRectangleVerticalHistory } from "@fortawesome/pro-light-svg-icons";

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
  showMoreMenuAtHover?: boolean;
  description?: string;
  recipeVersion?: number;
  setOpenShareModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setShareRecipeData?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      image: string;
      name: string;
      versionId: string;
    }>
  >;
  defaultVersionId?: string;
  token?: string;
  updateDataFunc?: ReferenceOfRecipeUpdateFuncType;
}

export default function DatacardComponent({
  title = "Triple Berry Smoothie",
  ingredients,
  category = "Smoothie",
  ratings,
  noOfRatings = 0,
  carbs = 23,
  score = 701,
  calorie = 270,
  noOfComments = 0,
  image = "/cards/juice.png",
  recipeId = "",
  notes = 0,
  addedToCompare = false,
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
  description = "",
  recipeVersion = 0,
  setOpenShareModal = () => {},
  setShareRecipeData = () => {},
  defaultVersionId = "",
  token = "",
  updateDataFunc = () => {},
}: dataCardInterface) {
  ratings = Math.ceil(ratings);
  const router = useRouter();
  const handleChangeCompare = useChangeCompare();
  const handleAddToCollection = useForAddToCollection();
  const handleOpenCollectionTray = useForOpenCollectionTray();
  const handleOpenCommentsTray = useForOpenCommentsTray();
  const selectCommentsAndNotesIcon = useForSelectCommentsAndNotesIcon();
  const [hoverRef, isHover] = useHover();
  const [hoverRefMoreMenu, isHoverMoreMenu] = useHover();

  const handleOpenShareRecipeModal = (id, name, image, versionId) => {
    setShareRecipeData({ id, image, name, versionId });
    setOpenShareModal(true);
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
        <p>{description ? description : ingredients}</p>
      </div>
    </div>
  );

  const showFloatingMenu = (id: string, name: string, image: string) => (
    <div className={styles.floating__menu}>
      <ul>
        <li
          onClick={() =>
            handleOpenShareRecipeModal(id, name, image, defaultVersionId)
          }
        >
          <img src="/icons/share.png" alt="square" />
        </li>
        <li onClick={() => router.push(`/edit_recipe/${recipeId}`)}>
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

  const handleShowCommentsAndNotesIcon = (
    comments: number,
    notes: number,
    updateDataFunc?: ReferenceOfRecipeUpdateFuncType,
  ) => {
    const res = selectCommentsAndNotesIcon(comments, notes);
    return (
      <Tooltip direction="left" content="Comments & Notes">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`/icons/${res?.icon}.svg`}
            alt="icon"
            onClick={(e) =>
              handleOpenCommentsTray(recipeId, title, image, e, updateDataFunc)
            }
          />{" "}
          <span style={{ color: res?.amount ? "#7cbc39" : "#c4c4c4" }}>
            {res?.amount}
          </span>
        </div>
      </Tooltip>
    );
  };

  return (
    <div className={styles.datacard} ref={hoverRef}>
      <div className={styles.datacard__inner}>
        <div className={styles.heading}>
          <div className={styles.title}>
            <h2
              onClick={(e) => {
                e?.stopPropagation();
                router.push(
                  `/recipe_details/${recipeId}/${
                    token ? "?token=" + token : ""
                  } `,
                );
              }}
            >
              {title}
              {isMatch ? "" : <span>{` (${postfixTitle})`}</span>}
            </h2>
          </div>
          <div className={styles.menu}>
            {showMoreMenu && (
              <div
                style={{ visibility: isHover ? "visible" : "hidden" }}
                ref={hoverRefMoreMenu}
              >
                {customMenu ? (
                  customMenu
                ) : (
                  <div style={{ position: "relative" }}>
                    <IconWarper
                      hover="bgSlightGray"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </IconWarper>
                    {isHoverMoreMenu &&
                      showFloatingMenu(recipeId, title, image)}
                  </div>
                )}
              </div>
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
                {recipeVersion >= 2 ? (
                  <Tooltip
                    direction="top"
                    content={`Versions(${recipeVersion - 1})`}
                  >
                    <FontAwesomeIcon
                      icon={faRectangleVerticalHistory}
                      color="#7cbc39"
                      onClick={() => router.push(`/versionCompare/${recipeId}`)}
                    />
                  </Tooltip>
                ) : null}
              </li>
              <li>
                <Tooltip direction="top" content="Compare">
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
                        updateDataFunc,
                      )
                    }
                  />
                </Tooltip>
              </li>
              <li>
                <Tooltip direction="top" content="Collection">
                  <img
                    src={
                      isCollectionIds?.length
                        ? "/icons/compare.svg"
                        : "/images/BookmarksStar.svg"
                    }
                    alt="compare"
                    onClick={(e) =>
                      isCollectionIds?.length
                        ? handleOpenCollectionTray(
                            recipeId,
                            isCollectionIds,
                            e,
                            updateDataFunc,
                          )
                        : handleAddToCollection(
                            recipeId,
                            setOpenCollectionModal,
                            e,
                            updateDataFunc,
                          )
                    }
                  />
                </Tooltip>
              </li>
              <li>
                {handleShowCommentsAndNotesIcon(
                  noOfComments,
                  notes,
                  updateDataFunc,
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
