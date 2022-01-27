/* eslint-disable @next/next/no-img-element */
import { useMutation } from "@apollo/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdPersonOutline } from "react-icons/md";
import CREATE_NET_COMMENT from "../../../../gqlLib/comments/mutation/createNewComment";
import DELETE_COMMENT from "../../../../gqlLib/comments/mutation/deleteComment";
import EDIT_COMMENT from "../../../../gqlLib/comments/mutation/edtiComment";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import CommentBox from "../commentBox/CommentBox";
import styles from "./CommentSection.module.scss";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import StarRating from "../../../../theme/starRating/StarRating";
import { format, parseISO } from "date-fns";

type CommentSectionProps = {
  allComments: any[];
  setComments: Dispatch<SetStateAction<any[]>>;
  userComments: {};
  setUserComments: Dispatch<SetStateAction<{}>>;
};

const CommentSection = ({
  allComments,
  setComments,
  setUserComments,
  userComments,
}: CommentSectionProps) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [rating, setRating] = useState(0);
  const { user, dbUser } = useAppSelector((state) => state?.user);
  const [updateComment, setUpdateComment] = useState(false);
  const [updateCommentId, setUpdateCommentId] = useState("");
  const [comment, setComment] = useState("");
  const [createComment] = useMutation(CREATE_NET_COMMENT);
  // const [editComment] = useMutation(EDIT_COMMENT);
  // const [deleteComment] = useMutation(DELETE_COMMENT);
  const { activeRecipeId } = useAppSelector((state) => state?.collections);
  const dispatch = useAppDispatch();
  console.log(allComments);

  // const removeNote = async (id: string) => {
  //   dispatch(setLoading(true));
  //   try {
  //     const { data } = await deleteNote({
  //       variables: {
  //         data: {
  //           recipeId: activeRecipeId,
  //           userId: dbUser?._id,
  //           noteId: id,
  //         },
  //       },
  //     });
  //     setAllNotes(data?.removeMyNote);
  //     dispatch(setLoading(false));
  //     reactToastifyNotification("info", "Delete successfully");
  //   } catch (error) {
  //     dispatch(setLoading(false));
  //     reactToastifyNotification("error", error?.message);
  //   }
  // };

  const createOrUpdateComment = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await createComment({
        variables: {
          data: {
            comment: comment,
            rating: rating || 1,
            recipeId: activeRecipeId,
            userId: dbUser?._id,
          },
        },

        // {
        //   editMyNoteData2: {
        //     editableObject: { body: noteForm?.body, title: noteForm?.title },
        //     noteId: updateNoteId,
        //     userId: dbUser?._id,
        //     recipeId: activeRecipeId,
        //   },
        // },
      });

      setComments(data?.createComment?.comments || []);
      setUserComments(data?.createComment?.userComment || {});

      // const { data } = await createNote({
      //   variables: {
      //     data: {
      //       body: noteForm?.body,
      //       title: noteForm?.title,
      //       recipeId: activeRecipeId,
      //       userId: dbUser?._id,
      //     },
      //   },
      // });
      // setAllNotes(data?.createNewNote);

      dispatch(setLoading(false));
      reactToastifyNotification("info", "Comment create successfully");
      toggleCommentBox();
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", error?.message);
    }
  };

  // const updateNoteValue = (id: string, title: string, body: string) => {
  //   setUpdateNote(true);
  //   setNoteForm((pre) => ({ ...pre, title, body }));
  //   setUpdateNoteId(id);
  //   toggleNoteForm();
  // };

  const toggleCommentBox = () => {
    setShowCommentBox((pre) => !pre);
  };
  return (
    <div>
      {/* @ts-ignore */}
      {userComments?.comment ? (
        <div style={{ padding: "10px" }}>
          <div className={styles.singleComment}>
            <div className={styles.header}>
              <div className={styles.leftSide}>
                <div className={styles.userIcon}>
                  {dbUser?.image ? (
                    <img src={dbUser?.image} alt="user_img" />
                  ) : (
                    <MdPersonOutline />
                  )}
                </div>
                <h6>
                  {" "}
                  {dbUser?.displayName ||
                    dbUser?.lastName ||
                    dbUser?.firstName ||
                    dbUser?.email}
                </h6>
              </div>
              <div>
                {[...Array(5)].map((star, index) => {
                  return (
                    <span
                      key={index}
                      className={`${styles.star} ${
                        //@ts-ignore
                        index <= userComments?.rating - 1
                          ? styles.on
                          : styles.off
                      }`}
                    >
                      &#9733;
                    </span>
                  );
                })}
              </div>
            </div>
            {/* @ts-ignore */}
            <p>{userComments?.comment}</p>
            <span>
              {/* @ts-ignore */}
              {userComments?.updatedAt ? (
                <>
                  {/* @ts-ignore */}
                  {format(parseISO(userComments?.updatedAt), "dd/mm/yyyy")}{" "}
                  (edited)
                </>
              ) : (
                /* @ts-ignore */
                format(parseISO(userComments?.createdAt), "dd/mm/yyyy")
              )}
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.userImage}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.imageBox}>
              {dbUser?.image ? (
                <img src={dbUser?.image} alt="user_img" />
              ) : (
                <MdPersonOutline />
              )}
            </div>

            <h6>
              {dbUser?.displayName ||
                dbUser?.lastName ||
                dbUser?.firstName ||
                dbUser?.email}
            </h6>
          </div>
          <StarRating rating={rating} setRating={setRating} />
          {/* <img src="/images/star.png" alt="star-imag" /> */}
        </div>
      )}
      {/* @ts-ignore */}
      {userComments?.comment ? null : showCommentBox ? (
        <CommentBox
          toggleCommentBox={toggleCommentBox}
          comment={comment}
          setComment={setComment}
          createOrUpdateComment={createOrUpdateComment}
        />
      ) : null}

      <div className={styles.commentsIconBox}>
        <span>{allComments?.length || 0} comments</span>
        {/* @ts-ignore */}
        {userComments?.comment ? null : showCommentBox ? null : (
          <button onClick={toggleCommentBox}>
            <img src="/images/plus-white-icon.svg" alt="add-icon" />
            <span>Add</span>
          </button>
        )}
      </div>
      <div className={`${styles.commentsShowContainer} y-scroll`}>
        {allComments?.map((comment, index) => {
          return (
            <div className={styles.singleComment} key={index}>
              <div className={styles.header}>
                <div className={styles.leftSide}>
                  <div className={styles.userIcon}>
                    {comment?.userId?.image ? (
                      <img src={comment?.userId?.image} alt="user" />
                    ) : (
                      <MdPersonOutline />
                    )}
                  </div>
                  <h6>
                    {" "}
                    {comment?.userId?.displayName ||
                      comment?.userId?.lastName ||
                      comment?.userId?.firstName ||
                      comment?.userId?.email}
                  </h6>
                </div>
                <div>
                  {[...Array(5)].map((star, index) => {
                    return (
                      <span
                        key={index}
                        className={`${styles.star} ${
                          //@ts-ignore
                          index <= comment?.rating - 1 ? styles.on : styles.off
                        }`}
                      >
                        &#9733;
                      </span>
                    );
                  })}
                </div>
              </div>
              <p>{comment?.comment}</p>
              <span>
                {/* @ts-ignore */}
                {comment?.updatedAt ? (
                  <>
                    {format(parseISO(comment?.updatedAt), "dd/mm/yyyy")}{" "}
                    (edited)
                  </>
                ) : (
                  format(parseISO(comment?.createdAt), "dd/mm/yyyy")
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
