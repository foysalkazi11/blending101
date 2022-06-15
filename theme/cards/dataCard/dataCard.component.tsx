/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import styles from "./dataCard.module.scss";
import MoreVertIcon from "../../../public/icons/more_vert_black_36dp.svg";
import { slicedString } from "../../../services/string.service";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setOpenCollectionsTary,
  setOpenCommentsTray,
  setToggleSaveRecipeModal,
} from "../../../redux/slices/sideTraySlice";
import {
  setActiveRecipeId,
  setChangeRecipeWithinCollection,
  setLastModifiedCollection,
  setSingleRecipeWithinCollecions,
} from "../../../redux/slices/collectionSlice";
import { setLoading } from "../../../redux/slices/utilitySlice";
import ADD_NEW_RECIPE_TO_COLLECTION from "../../../gqlLib/collection/mutation/addNewRecipeToCollection";
import { useMutation, useLazyQuery } from "@apollo/client";
import GET_LAST_MODIFIED_COLLECTION from "../../../gqlLib/collection/query/getLastModifiedCollection";
import { setCurrentRecipeInfo } from "../../../redux/slices/recipeSlice";
import { useRouter } from "next/router";
import useChangeCompare from "../../../customHooks/useChangeComaper";
import { MdOutlineEdit } from "react-icons/md";
import useUpdateRecipeField from "../../../customHooks/useUpdateRecipeFirld";

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
  const dispatch = useAppDispatch();
  const updateRecipe = useUpdateRecipeField();
  const [addNewRecipeToCollection] = useMutation(ADD_NEW_RECIPE_TO_COLLECTION);
  const [getLastModifiedCollection] = useLazyQuery(
    GET_LAST_MODIFIED_COLLECTION,
    { fetchPolicy: "network-only" },
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const handleChangeCompare = useChangeCompare();

  const addToCollection = async (recipeId: string, e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch(setActiveRecipeId(recipeId));
    dispatch(setOpenCollectionsTary(false));
    const variablesData = {
      recipe: recipeId,
      userEmail: dbUser?.email,
    };

    try {
      await addNewRecipeToCollection({
        variables: {
          data: variablesData,
        },
      });

      const { data: lastModified } = await getLastModifiedCollection({
        variables: {
          userEmail: dbUser?.email,
        },
      });
      updateRecipe(recipeId, {
        userCollections: [lastModified?.getLastModifieldCollection?._id],
      });
      dispatch(
        setLastModifiedCollection({
          id: lastModified?.getLastModifieldCollection?._id,
          name: lastModified?.getLastModifieldCollection?.name,
        }),
      );

      dispatch(setToggleSaveRecipeModal(true));
      setTimeout(() => {
        dispatch(setToggleSaveRecipeModal(false));
      }, 5000);
      // reactToastifyNotification("info", `Successfully added to new collection`);
    } catch (error) {
      updateRecipe(recipeId, { userCollections: null });
      console.log(error);

      // reactToastifyNotification("eror", error?.message);
    }
  };

  const handleOpenCollectionTray = (
    id: string,
    collectionIds: string[],
    e: React.SyntheticEvent,
  ) => {
    e?.stopPropagation();
    dispatch(setSingleRecipeWithinCollecions(collectionIds));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    dispatch(setActiveRecipeId(id));
  };

  const handleComment = (
    id: string,
    title: string,
    image: string,
    e: React.SyntheticEvent,
  ) => {
    // HANDLE COMMENTS CLICK HERE
    e?.stopPropagation();
    dispatch(setActiveRecipeId(id));
    dispatch(setOpenCommentsTray(true));
    dispatch(setCurrentRecipeInfo({ name: title, image }));
    dispatch(setOpenCollectionsTary(false));
  };

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
    const showCommentsAndNotes = (icon: string, num: number | string) => {
      return (
        <>
          <img
            src={`/icons/${icon}.svg`}
            alt="icon"
            onClick={(e) => handleComment(recipeId, title, image, e)}
          />{" "}
          <span style={{ color: num ? "#7cbc39" : "#c4c4c4" }}>{num}</span>
        </>
      );
    };

    if (!comments && !notes) {
      return showCommentsAndNotes("noComments&NoNotes", 0);
    } else if (comments && !notes) {
      return showCommentsAndNotes("commentsOnly", comments);
    } else if (!comments && notes) {
      return showCommentsAndNotes("notesOnly", "");
    } else {
      return showCommentsAndNotes("comments&notes", comments);
    }
  };

  return (
    <div className={styles.datacard}>
      <div className={styles.datacard__inner}>
        <div className={styles.datacard__body}>
          <div className={styles.datacard__body__top}>
            <div className={styles.datacard__body__top__heading}>
              <h2
                className={styles.title}
                onClick={() => router.push(`/recipe_details/${recipeId}`)}
              >
                {title}
              </h2>
            </div>
            <div className={styles.datacard__body__top__menu}>
              {showMoreMenu ? (
                <>
                  <MoreVertIcon onClick={handleClick} />
                  <FloatingMenu />
                </>
              ) : null}
            </div>
          </div>
          <div className={styles.datacard__body__middle}>
            <div className={styles.datacard__body__middle__left}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
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
              <img src="/icons/delish.png" alt="brand" />
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
                    alt="eclipse"
                    onClick={(e) =>
                      addedToCompare
                        ? handleChangeCompare(
                            e,
                            recipeId,
                            false,
                            compareRecipeList,
                            setcompareRecipeList,
                          )
                        : handleChangeCompare(
                            e,
                            recipeId,
                            true,
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
                        : addToCollection(recipeId, e)
                    }
                  />
                </li>
                <li>{hangleShowCommentsAndNotesIcon(noOfComments, notes)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
