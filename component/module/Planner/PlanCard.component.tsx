/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useRef } from "react";
import styles from "./PlanCard.module.scss";
import MoreVertIcon from "../../../public/icons/more_vert_black_36dp.svg";
import { slicedString } from "../../../services/string.service";
import { useRouter } from "next/router";
import useChangeCompare from "../../../customHooks/useChangeComaper";
import { MdOutlineEdit } from "react-icons/md";
import useForAddToCollection from "../../../customHooks/useForAddToCollection";
import useForOpenCollectionTray from "../../../customHooks/useForOpenCollection";
import useForOpenCommentsTray from "../../../customHooks/useForOpenCommentsTray";
import useForSelectCommentsAndNotesIcon from "../../../customHooks/useForSelectCommentsAndNotesIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import { faCalendarWeek, faUser } from "@fortawesome/pro-light-svg-icons";
import { RecipeCreatorInfo } from "../../../type/recipeType";
import useHover from "../../../components/utility/useHover";
import { Tooltip } from "recharts";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import Icon from "../../atoms/Icon/Icon.component";

interface dataCardInterface {
  title?: string;
  ingredients?: string;
  category?: string;
  ratings?: number;
  noOfRatings?: number;
  carbs?: number;
  score?: number;
  calorie?: number;
  noOfComments?: number;
  image?: string;
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
  showMoreMenuAtHover?: boolean;
  description?: string;
  className?: string;
}

export default function PlanCard({
  className,
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
  recipeId = "asf4weyfdh5477",
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
  showMoreMenuAtHover = false,
  description = "",
}: dataCardInterface) {
  title = title || "Diabetes Friendly Meal Plan: Week 1";
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
  const [hoverRef, isHover] = useHover();

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
        <p>{description ? description : ingredients}</p>
      </div>
    </div>
  );

  const floatingMenu = (
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

  const showFloatingMenu = (
    <>
      <IconWarper
        hover="bgSlightGray"
        handleClick={handleClick}
        style={{ width: "30px", height: "30px" }}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </IconWarper>
      {floatingMenu}
    </>
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
    <div className={`${styles.datacard} ${className || ""}`} ref={hoverRef}>
      <div className={styles.datacard__inner}>
        <div className={styles.heading}>
          <div className={styles.title}>
            <h2
              onClick={(e) => {
                e?.stopPropagation();
                router.push(`/planner/plan/${recipeId}`);
              }}
            >
              {title}
            </h2>
          </div>
          <div className={styles.menu}>
            {showMoreMenu &&
              (showMoreMenuAtHover ? (
                <div style={{ visibility: isHover ? "visible" : "hidden" }}>
                  {customMenu ? customMenu : showFloatingMenu}
                </div>
              ) : (
                <>{customMenu ? customMenu : showFloatingMenu}</>
              ))}
          </div>
        </div>
        <div className={styles.datacard__body__middle}>
          <img src="/images/plan.png" alt="" />
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
            <div className={styles.databody__top__info}>
              <img src="/icons/star.svg" alt="star" />
              <span>{ratings || 0}</span>&nbsp;
              <span>({noOfRatings || 0})</span>
            </div>
          </div>
          <div className={styles.datacard__body__bottom__right}>
            <ul>
              <li>
                <Icon fontName={faCalendarWeek} size="2rem" color="#aaa" />
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
