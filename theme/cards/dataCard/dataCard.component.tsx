/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import styles from "./dataCard.module.scss";
import { useRouter } from "next/router";
import useChangeCompare from "../../../customHooks/useChangeComaper";
import { MdOutlineEdit } from "react-icons/md";
import useForAddToCollection from "../../../customHooks/useForAddToCollection";
import useForOpenCollectionTray from "../../../customHooks/useForOpenCollection";
import useForOpenCommentsTray from "../../../customHooks/useForOpenCommentsTray";
import useForSelectCommentsAndNotesIcon from "../../../customHooks/useForSelectCommentsAndNotesIcon";
import IconWarper from "../../iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faStarSharp,
} from "@fortawesome/pro-solid-svg-icons";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import Tooltip from "../../toolTip/CustomToolTip";
import {
  RecipeBrandType,
  RecipeCreatorInfo,
  RecipeSmallVersionType,
  ReferenceOfRecipeUpdateFuncType,
} from "../../../type/recipeType";
import useHover from "../../../components/utility/useHover";
import { faRectangleVerticalHistory } from "@fortawesome/pro-light-svg-icons";
import useToChangeDefaultVersion from "../../../customHooks/useToChangeDefaultVersion";
import { useAppSelector } from "../../../redux/hooks";
import { VersionDataType } from "../../../type/recipeDetailsType";
import notification from "../../../components/utility/reactToastifyNotification";
import { faShareNodes } from "@fortawesome/pro-regular-svg-icons";
import useTurnedOnOrOffVersion from "../../../customHooks/useTurnedOnOrOffVersion";
import CircularRotatingLoader from "../../loader/circularRotatingLoader.component";
import isEmptyObj from "../../../helperFunc/object/isEmptyObj";
import { AccessPermission } from "../../../type/recipeCardType";
import useExtension from "../../../hooks/useExtension";
import { useUser } from "../../../context/AuthProvider";

interface dataCardInterface {
  title: string;
  ingredients: string;
  category: string;
  ratings: number;
  noOfRatings: number;
  carbs?: number;
  score?: number;
  calorie?: number;
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
      turnedOnVersions: string[];
    }>
  >;
  defaultVersionId?: string;
  token?: string;
  updateDataFunc?: ReferenceOfRecipeUpdateFuncType;
  versionHandler?: (recipeId: string, version?: VersionDataType) => void;

  updateDataAfterChangeDefaultVersion?: (
    versionId: string,
    returnObj: { [key: string]: any },
  ) => void;
  isVersionSharable?: boolean;
  defaultVersion?: VersionDataType;
  brand?: RecipeBrandType;
  personalRating?: number;
  origin?: string;
  turnedOnVersions?: VersionDataType[];
  viewPermissions?: AccessPermission[];
  interactionPermissions?: AccessPermission[];
}

export default function DatacardComponent({
  title = "Triple Berry Smoothie",
  ingredients,
  category = "Smoothie",
  ratings,
  noOfRatings = 0,
  carbs = 0,
  score = 100,
  calorie = 0,
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
  versionHandler,
  updateDataAfterChangeDefaultVersion = () => {},
  isVersionSharable = true,
  defaultVersion = {} as VersionDataType,
  brand,
  personalRating = 0,
  origin = "#",
  turnedOnVersions = [],
  interactionPermissions = ["all"],
  viewPermissions = [
    "title",
    "moreMenu",
    "brand",
    "version",
    "compare",
    "collection",
    "comments&Notes",
  ],
}: dataCardInterface) {
  carbs = Math.round(carbs);
  score = Math.round(score);
  calorie = Math.round(calorie);
  ratings = Math.ceil(ratings);
  const router = useRouter();
  const { handleChangeCompare, loading: changeCompareLoading } =
    useChangeCompare();
  const { addToCollection, loading: addToCollectionLoading } =
    useForAddToCollection();
  const handleOpenCollectionTray = useForOpenCollectionTray();
  const handleOpenCommentsTray = useForOpenCommentsTray();
  const selectCommentsAndNotesIcon = useForSelectCommentsAndNotesIcon();
  const [hoverRef, isHover] = useHover();
  const [hoverRefMoreMenu, isHoverMoreMenu] = useHover();
  const {
    handleToUpdateDefaultVersion,
    data: changeDefaultVersionReturnObj,
    loading: changeDefaultVersionLoading,
  } = useToChangeDefaultVersion();
  const user = useUser();
  const authData = useExtension();
  // view permission
  const hasViewPermission = useCallback(
    (permission: AccessPermission): boolean => {
      return (
        viewPermissions.includes(permission) || viewPermissions.includes("all")
      );
    },
    [viewPermissions],
  );

  // interact permission
  const hasInteractionPermission = useCallback(
    (permission: AccessPermission): boolean => {
      return (
        interactionPermissions.includes(permission) ||
        interactionPermissions.includes("all")
      );
    },
    [interactionPermissions],
  );

  // open share recipe modal
  const handleOpenShareRecipeModal = (
    id,
    name,
    image,
    versionId,
    turnedOnVersions,
  ) => {
    setShareRecipeData({ id, image, name, versionId, turnedOnVersions });
    setOpenShareModal(true);
  };

  // handle make default version
  const handleToMakeDefaultVersion = async () => {
    if (isVersionSharable) {
      await handleToUpdateDefaultVersion(
        user.id,
        recipeId,
        defaultVersionId,
        isMatch ? true : false,
        isVersionSharable ? false : true,
      );
      updateDataAfterChangeDefaultVersion(
        defaultVersionId,
        changeDefaultVersionReturnObj,
      );
    } else {
      notification(
        "warning",
        "Not allow to make default version as shearing is off !!!",
      );
    }
  };

  const dataBody = (
    <div className={styles.databody}>
      <div className={styles.databody__top}>
        <div className={styles.databody__top__label}>
          <div className={styles.category}>{category}</div>
          {showOptionalEditIcon ? (
            <div className={styles.floating__menu2}>
              <ul>
                <li onClick={changeToFormulateRecipe}>
                  <MdOutlineEdit className={styles.icon} />
                </li>
              </ul>
            </div>
          ) : null}
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

  const showFloatingMenu = (
    id: string,
    name: string,
    image: string,
    defaultVersionId: string,
    turnedOnVersions: string[],
  ) => (
    <div className={styles.floating__menu}>
      <ul>
        <li
          onClick={() =>
            handleOpenShareRecipeModal(
              id,
              name,
              image,
              defaultVersionId,
              turnedOnVersions,
            )
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
            onClick={(e) => {
              if (hasInteractionPermission("comments&Notes")) {
                handleOpenCommentsTray(
                  recipeId,
                  title,
                  image,
                  e,
                  updateDataFunc,
                  personalRating,
                );
              }
            }}
          />{" "}
          <span style={{ color: res?.amount ? "#7cbc39" : "#c4c4c4" }}>
            {res?.amount}
          </span>
        </div>
      </Tooltip>
    );
  };

  return (
    <div className={`${styles.datacard}`} ref={hoverRef}>
      <div className={styles.datacard__inner}>
        <div className={styles.heading}>
          <div className={styles.title}>
            <h2
              onClick={(e) => {
                if (hasInteractionPermission("title")) {
                  e?.stopPropagation();
                  router.push(
                    `/recipe_details/${recipeId}/${
                      token ? "?token=" + token : ""
                    } `,
                  );
                }
              }}
            >
              {postfixTitle || title}
            </h2>
          </div>
          <div className={styles.menu}>
            {showMoreMenu && (
              <div
                style={{ visibility: isHover ? "visible" : "hidden" }}
                ref={hoverRefMoreMenu}
              >
                {customMenu
                  ? customMenu
                  : hasViewPermission("moreMenu") && (
                      <div style={{ position: "relative" }}>
                        <IconWarper
                          hover="bgSlightGray"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </IconWarper>
                        {hasInteractionPermission("moreMenu") &&
                          isHoverMoreMenu &&
                          showFloatingMenu(
                            recipeId,
                            defaultVersion?.postfixTitle || title,
                            image,
                            defaultVersionId,
                            turnedOnVersions?.map((version) => version?._id),
                          )}
                      </div>
                    )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.datacard__body__middle}>
          <div className={styles.datacard__body__middle__left}>
            <img
              className={styles.image}
              // style={{
              //   backgroundImage: `url(${image || "/cards/coriander.png"})`,
              // }}
              src={image || "/cards/coriander.png"}
              alt="recipe_img"
            />
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
          <div className={styles.datacard__body__middle__right}>{dataBody}</div>
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
            <Tooltip
              content={
                !isEmptyObj(brand || {})
                  ? brand?.brandName || "Brand"
                  : userId?.displayName ||
                    `${userId?.lastName}` ||
                    `${userId?.firstName}` ||
                    "User name"
              }
              direction="right"
            >
              {!isEmptyObj(brand || {}) ? (
                <a
                  href={origin}
                  onClick={(e) => {
                    router.reload();
                    const id = "ebbpnaajpojkhndmjmdjabgjmngjgmhm";
                    //@ts-ignore
                    chrome.runtime.sendMessage(
                      id,
                      {
                        action: "BRAND_NAVIGATE",
                        payload: {
                          id: recipeId,
                          name: postfixTitle || title,
                          image,
                          origin,
                        },
                      },
                      () => {},
                    );
                    //@ts-ignore
                    chrome.runtime.sendMessage(
                      id,
                      {
                        action: "SYNC_AUTH",
                        payload: authData,
                      },
                      () => {},
                    );
                    window.location.href = "";
                  }}
                >
                  <img
                    className={styles.brand}
                    src={`${brand?.brandImage}` || "/icons/delish.png"}
                    alt="brand"
                  />
                </a>
              ) : userId?.image ? (
                <img className={styles.user} src={userId?.image} alt="brand" />
              ) : (
                <div className={styles.userIcon}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
            </Tooltip>
          </div>
          <div className={styles.datacard__body__bottom__right}>
            <ul>
              {hasViewPermission("version") && (
                <li>
                  {recipeVersion ? (
                    <Tooltip
                      direction="left"
                      content={`Versions(${recipeVersion})`}
                    >
                      <FontAwesomeIcon
                        icon={faRectangleVerticalHistory}
                        color="#7cbc39"
                        onClick={() => {
                          if (hasInteractionPermission("version")) {
                            versionHandler
                              ? versionHandler(recipeId)
                              : router.push(
                                  `/recipe/versionCompare/${recipeId}`,
                                );
                          }
                        }}
                      />
                    </Tooltip>
                  ) : null}
                </li>
              )}
              {hasViewPermission("compare") && (
                <li>
                  <Tooltip direction="left" content="Compare">
                    {changeCompareLoading ? (
                      <CircularRotatingLoader color="secondary" />
                    ) : (
                      <img
                        src={
                          addedToCompare
                            ? "/icons/compare-1.svg"
                            : "/icons/eclipse.svg"
                        }
                        alt="icon"
                        onClick={(e) => {
                          if (hasInteractionPermission("compare")) {
                            handleChangeCompare(
                              e,
                              recipeId,
                              defaultVersionId,
                              addedToCompare ? false : true,
                              updateDataFunc,
                            );
                          }
                        }}
                      />
                    )}
                  </Tooltip>
                </li>
              )}
              {hasViewPermission("collection") && (
                <li>
                  <Tooltip direction="left" content="Collection">
                    {addToCollectionLoading ? (
                      <CircularRotatingLoader color="primary" />
                    ) : (
                      <img
                        src={
                          isCollectionIds?.length
                            ? "/icons/compare.svg"
                            : "/images/BookmarksStar.svg"
                        }
                        alt="compare"
                        onClick={(e) => {
                          if (hasInteractionPermission("collection")) {
                            isCollectionIds?.length
                              ? handleOpenCollectionTray(
                                  recipeId,
                                  isCollectionIds,
                                  e,
                                  updateDataFunc,
                                )
                              : addToCollection(
                                  recipeId,
                                  setOpenCollectionModal,
                                  e,
                                  updateDataFunc,
                                );
                          }
                        }}
                      />
                    )}
                  </Tooltip>
                </li>
              )}

              {hasViewPermission("star") && (
                <li>
                  <Tooltip
                    content={`${isMatch ? "Default" : "Make default"}`}
                    direction="left"
                  >
                    {changeDefaultVersionLoading ? (
                      <CircularRotatingLoader color="primary" />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => {
                          if (hasInteractionPermission("star")) {
                            handleToMakeDefaultVersion();
                          }
                        }}
                        icon={faStarSharp}
                        className={`${styles.star} ${
                          isMatch ? styles.on : styles.off
                        }`}
                      />
                    )}
                  </Tooltip>
                </li>
              )}
              {hasViewPermission("comments&Notes") && (
                <li>
                  {handleShowCommentsAndNotesIcon(
                    noOfComments,
                    notes,
                    updateDataFunc,
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
