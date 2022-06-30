/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenCommentsTray } from "../../../redux/slices/sideTraySlice";
import styles from "./CommentsTray.module.scss";
import CommentSection from "./CommentSection/CommentSection";
import NoteSection from "./noteSection/NoteSection";
import { useLazyQuery } from "@apollo/client";
import GET_ALL_NOTES_FOR_A_RECIPE from "../../../gqlLib/notes/quries/getAllNotesForARecipe";
import reactToastifyNotification from "../../utility/reactToastifyNotification";
import GET_ALL_COMMENTS_FOR_A_RECIPE from "../../../gqlLib/comments/query/getAllCommentsForARecipe";
import SkeletonComment from "../../../theme/skeletons/skeletonComment/SkeletonComment";
import SkeletonNote from "../../../theme/skeletons/skeletonNote/SkeletonNote";
import TrayWrapper from "../TrayWrapper";
import TrayTag from "../TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessageDots } from "@fortawesome/pro-solid-svg-icons";

interface CommentsTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

export default function CommentsTray({
  showPanle,
  showTagByDefaut,
}: CommentsTrayProps) {
  const [allNotes, setAllNotes] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [userComments, setUserComments] = useState<any>({});
  const [toggle, setToggle] = useState(1);
  const { openCommentsTray } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state?.user);
  const { activeRecipeId } = useAppSelector((state) => state?.collections);
  const { currentRecipeInfo } = useAppSelector((state) => state?.recipe);
  const [getAllNotesForARecipe, { data: noteData, loading: noteLoading }] =
    useLazyQuery(GET_ALL_NOTES_FOR_A_RECIPE, {
      fetchPolicy: "network-only",
    });
  const [
    getAllCommentsForARecipe,
    { data: commentData, loading: commentLoading },
  ] = useLazyQuery(GET_ALL_COMMENTS_FOR_A_RECIPE, {
    fetchPolicy: "network-only",
  });
  const reff = useRef<any>();

  const fetchCommentsAndNotes = async () => {
    try {
      getAllCommentsForARecipe({
        variables: {
          getAllCommentsForARecipeData2: {
            recipeId: activeRecipeId,
            userId: dbUser?._id,
          },
        },
      });
      getAllNotesForARecipe({
        variables: { data: { recipeId: activeRecipeId, userId: dbUser?._id } },
      });
    } catch (error) {
      reactToastifyNotification(error?.message);
    }
  };

  useEffect(() => {
    if (!noteLoading) {
      setAllNotes(noteData?.getMyNotesForARecipe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteData]);

  useEffect(() => {
    if (!commentLoading) {
      // const { comments, userComment } = commentData?.getAllCommentsForARecipe;
      setAllComments(commentData?.getAllCommentsForARecipe?.comments || {});
      setUserComments(commentData?.getAllCommentsForARecipe?.userComment || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentData]);

  useEffect(() => {
    if (openCommentsTray && activeRecipeId) {
      fetchCommentsAndNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCommentsTray, activeRecipeId]);

  const handleClick = () => {
    dispatch(setOpenCommentsTray(!openCommentsTray));
  };

  const handleToggle = (no: number) => {
    if (no === 1) {
      reff.current.style.left = "0";
    } else {
      reff.current.style.left = "50%";
    }
    setToggle(no);
  };

  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={handleClick}
      openTray={openCommentsTray}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faMessageDots} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <div className={styles.main}>
        <div className={styles.main__top}>
          <div className={styles.main__top__menu}>
            <div className={styles.active} ref={reff}></div>
            <div
              className={
                toggle === 2
                  ? styles.main__top__menu__child + " " + styles.inActiveImg
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(1)}
            >
              <img src="/icons/comment.svg" alt="comment_icon" /> Comments
            </div>
            <div
              className={
                toggle === 1
                  ? styles.main__top__menu__child + " " + styles.inActiveImg
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(2)}
            >
              <img src="/images/noun_note_3378544.svg" alt="note_icon" /> Notes
            </div>
          </div>
        </div>
      </div>
      <div className={styles.recipeName}>
        <img src={currentRecipeInfo?.image} alt="recipe_img" />
        <h3>{currentRecipeInfo?.name}</h3>
      </div>

      {noteLoading || commentLoading ? (
        toggle === 1 ? (
          <SkeletonComment />
        ) : (
          <SkeletonNote />
        )
      ) : toggle === 1 ? (
        <CommentSection
          allComments={allComments}
          setComments={setAllComments}
          userComments={userComments}
          setUserComments={setUserComments}
        />
      ) : (
        <NoteSection allNotes={allNotes} setAllNotes={setAllNotes} />
      )}
    </TrayWrapper>
  );
}
