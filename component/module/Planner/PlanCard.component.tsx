/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, forwardRef, Fragment, SetStateAction, useRef, useState } from "react";
import styles from "./PlanCard.module.scss";
import useForSelectCommentsAndNotesIcon from "../../../customHooks/useForSelectCommentsAndNotesIcon";
import { faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/pro-light-svg-icons";
import { RecipeCreatorInfo } from "../../../type/recipeType";
import useHover from "../../../components/utility/useHover";
import Icon from "../../atoms/Icon/Icon.component";
import WeekPicker from "../../molecules/Date/Week.component";
import { startOfWeek, endOfWeek } from "date-fns";
import useToAddPlanToCollection from "../../../customHooks/plan/useToAddPlanToCollection";
import Link from "next/link";
import useToOpenPlanCollectionTray from "../../../customHooks/plan/useToOpenPlanCollectionTray";
import { PlanComeFromType } from "../../../redux/slices/Planner.slice";
import useToOpenPlanCommentsTray from "../../../customHooks/plan/useToOpenPlanCommentsTray";
import { useUser } from "../../../context/AuthProvider";
import { faShareNodes, faCartShopping, faPen } from "@fortawesome/pro-light-svg-icons";
import IconButton from "component/atoms/Button/IconButton.component";
import { useRouter } from "next/router";
import ShareModal from "component/organisms/Share/Share.component";
import { usePlanToGrocery, useSharePlan } from "@/plan/hooks";

interface PlanCardProps {
  title?: string;
  ratings?: number;
  noOfRatings?: number;
  carbs?: number;
  score?: number;
  calorie?: number;
  noOfComments?: number;
  image?: string;
  planId?: string;
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
  showMoreMenuAtHover?: boolean;
  description?: string;
  className?: string;
  weekRange?: {
    start: Date;
    end: Date;
  };
  planComrFrom?: PlanComeFromType;
  myRating?: number;
  variant?: "border" | "shadow";
}

function PlanCard(props: PlanCardProps) {
  const {
    className,
    variant,
    title,
    ratings,
    noOfRatings,
    carbs,
    score,
    calorie,
    noOfComments,
    image,
    weekRange,
    planId = "asf4weyfdh5477",
    notes = 0,
    isCollectionIds = [] || null,
    setOpenCollectionModal = () => {},
    planComrFrom = "list",
    myRating = 0,
  } = props;
  const menu = useRef<any>();
  const handleAddToCollection = useToAddPlanToCollection();
  const handleOpenPlanCommentsTray = useToOpenPlanCommentsTray();
  const selectCommentsAndNotesIcon = useForSelectCommentsAndNotesIcon();
  const handleOpenCollectionTray = useToOpenPlanCollectionTray();
  const [week, setWeek] = useState(weekRange);
  const [showShare, setShowShare] = useState(false);

  const router = useRouter();
  const { id: memberId } = useUser();
  const [link, getLink] = useSharePlan(planId);
  const addToGrocery = usePlanToGrocery();

  const commentsHandler = (comments: number, notes: number, myRating: number) => {
    const res = selectCommentsAndNotesIcon(comments, notes);
    return (
      <>
        <img
          src={`/icons/${res?.icon}.svg`}
          alt="icon"
          onClick={(e) => {
            handleOpenPlanCommentsTray({
              id: planId,
              name: title,
              image,
              myRating,
            });
          }}
        />{" "}
        <span style={{ color: res?.amount ? "#7cbc39" : "#c4c4c4" }}>{res?.amount}</span>
      </>
    );
  };

  return (
    <Fragment>
      <ShareModal name={title} show={showShare} setShow={setShowShare} link={link} onShare={getLink} />

      <div className={`${styles.datacard} ${className || ""} ${styles[variant]}`}>
        <div className={styles.datacard__inner}>
          <div className={styles.heading}>
            <div className={styles.title}>
              <Link href={`/planner/plan/${planId}`} className={styles.title}>
                <h2>{title}</h2>
              </Link>
            </div>
            <div className={styles.menu}>
              <IconButton
                fontName={faEllipsisVertical}
                onClick={() => {
                  const elem = menu.current;
                  elem.classList.toggle("show__hidden");
                }}
              />
              <div className={styles.floating__menu} ref={menu}>
                <ul>
                  <li onClick={() => router.push(`/planner/plan/${planId}`)}>
                    <Icon fontName={faPen} size="1.6rem" color="#fe5d1f" />
                  </li>
                  <li onClick={() => addToGrocery(planId)}>
                    <Icon fontName={faCartShopping} size="1.6rem" color="#fe5d1f" />
                  </li>
                  <li onClick={() => setShowShare(true)}>
                    <Icon fontName={faShareNodes} size="1.6rem" color="#fe5d1f" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.datacard__body__middle}>
            <img src={image} alt="" />
          </div>
          <div className={styles.datacard__body__belt}>
            <div className={styles.datacard__body__belt__child}>
              Net Carbs <span>{Math.round(carbs)}</span>
            </div>
            <div className={styles.datacard__body__belt__child}>
              Rx Score <span>{Math.round(score)}</span>
            </div>
            <div className={styles.datacard__body__belt__child}>
              Calorie <span>{Math.round(calorie)}</span>
            </div>
          </div>
          <div className={styles.datacard__body__bottom}>
            <div className={styles.datacard__body__bottom__left}>
              <div className={styles.databody__top__info}>
                <img src="/icons/star.svg" alt="star" />
                <span>{Math.round(ratings) || 0}</span>&nbsp;
                <span>({noOfRatings || 0})</span>
              </div>
            </div>
            <div className={styles.datacard__body__bottom__right}>
              <ul>
                <li>
                  <WeekPicker element={<DatePickerButton />} week={week} onWeekChange={() => {}} />
                </li>
                <li>
                  <img
                    src={isCollectionIds?.length ? "/icons/compare.svg" : "/images/BookmarksStar.svg"}
                    alt="compare"
                    onClick={(e) => {
                      e.stopPropagation();
                      isCollectionIds?.length
                        ? handleOpenCollectionTray(planId, isCollectionIds, planComrFrom)
                        : handleAddToCollection(planId, memberId, setOpenCollectionModal, planComrFrom);
                    }}
                  />
                </li>
                <li>{commentsHandler(noOfComments, notes, myRating)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => (
  <span onClick={onClick} ref={ref}>
    <Icon fontName={faCalendarWeek} size="2rem" color="#aaa" />
  </span>
));
DatePickerButton.displayName = "DatePickerButton";

PlanCard.defaultProps = {
  title: "Diabetes Friendly Meal Plan: Week 1",
  noOfRatings: 0,
  carbs: 0,
  calorie: 0,
  score: 0,
  noOfComments: 0,
  image: "/images/plan.png",
  weekRange: { start: startOfWeek(new Date()), end: endOfWeek(new Date()) },
  variant: "shadow",
};
export default PlanCard;
