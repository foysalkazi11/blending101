/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
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
import { faMemo, faMessageDots } from "@fortawesome/pro-solid-svg-icons";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";

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
  const [toggle, setToggle] = useState(0);
  const { openCommentsTray } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state?.user);
  const { activeRecipeId } = useAppSelector((state) => state?.collections);
  const { currentRecipeInfo } = useAppSelector((state) => state?.recipe);
  const [getAllNotesForARecipe, { data: noteData, loading: noteLoading }] =
    useLazyQuery(GET_ALL_NOTES_FOR_A_RECIPE, {
      fetchPolicy: "cache-and-network",
    });
  const [
    getAllCommentsForARecipe,
    { data: commentData, loading: commentLoading },
  ] = useLazyQuery(GET_ALL_COMMENTS_FOR_A_RECIPE, {
    fetchPolicy: "cache-and-network",
  });

  const fetchCommentsAndNotes = async () => {
    try {
      getAllCommentsForARecipe({
        variables: {
          data: {
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
      <ToggleMenu
        setToggle={handleToggle}
        toggle={toggle}
        toggleMenuList={[
          <div key={"key0"} style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faMessageDots}
              style={{ marginRight: "5px" }}
            />

            <p>Comments</p>
          </div>,
          <div key={"key1"} style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon icon={faMemo} style={{ marginRight: "5px" }} />
            <p>Notes</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />

      <div className={styles.recipeName}>
        <img src={currentRecipeInfo?.image} alt="img" />
        <h3>{currentRecipeInfo?.name}</h3>
      </div>

      {noteLoading || commentLoading ? (
        toggle === 0 ? (
          <SkeletonComment />
        ) : (
          <SkeletonNote />
        )
      ) : toggle === 0 ? (
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
