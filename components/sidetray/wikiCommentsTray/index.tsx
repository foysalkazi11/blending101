import { useLazyQuery, useMutation } from "@apollo/client";
import { faMessageDots, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import CREATE_WIKI_COMMENT from "../../../gqlLib/wiki/mutation/createWikiComment";
import EDIT_WIKI_COMMENTS from "../../../gqlLib/wiki/mutation/editWikiComment";
import REMOVE_WIKI_COMMENT from "../../../gqlLib/wiki/mutation/removeAWikiComment";
import GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY from "../../../gqlLib/wiki/query/getAllWikiCommentsForAWikiEntity";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsOpenWikiCommentsTray } from "../../../redux/slices/wikiSlice";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import SkeletonComment from "../../../theme/skeletons/skeletonComment/SkeletonComment";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import {
  WikiCommentsType,
  WikiUserComment,
} from "../../../type/wikiCommentsType";
import notification from "../../utility/reactToastifyNotification";
import CommentBox from "../commentsTray/commentBox/CommentBox";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";
import CommentsBottomSection from "./CommentsBottomSection";
import CommentsTopSection from "./CommentsTopSection";
import s from "./WikiCommentsTray.module.scss";

interface Props {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

const WikiCommentsTray = ({
  showPanle = "right",
  showTagByDefaut = false,
}: Props) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [comment, setComment] = useState("");
  const [wikiComments, setWikiComments] = useState<WikiCommentsType>(
    {} as WikiCommentsType,
  );
  const dispatch = useAppDispatch();
  const { isOpenWikiCommentsTray, wikiCommentsTrayCurrentWikiEntity } =
    useAppSelector((state) => state?.wiki);
  const { dbUser } = useAppSelector((state) => state?.user);
  const [
    getAllWikiCommentsForAWikiEntity,
    { loading: getAllWikiCommentsLoading },
  ] = useLazyQuery(GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY);
  const [crateWikiComment, { loading: createWikiCommentLoading }] =
    useMutation(CREATE_WIKI_COMMENT);
  const [editWikiComment, { loading: editWikiCommentLoading }] =
    useMutation(EDIT_WIKI_COMMENTS);
  const [removeWikiComment, { loading: removeWikiCommentLoading }] =
    useMutation(REMOVE_WIKI_COMMENT);

  // update Comment value
  const updateCommentValue = (comment: string) => {
    setUpdateComment(true);
    setComment(comment);
    setShowCommentBox(true);
  };

  // delete wiki comment
  const handleToRemoveWikiComment = async () => {
    const { id } = wikiCommentsTrayCurrentWikiEntity;
    try {
      await removeWikiComment({
        variables: {
          entityId: id,
          userId: dbUser?._id,
        },
      });

      setWikiComments((prev) => ({
        ...prev,
        userComment: null,
      }));
    } catch (error) {
      notification("error", "Unable to delete wiki comment");
    }
  };

  // create or update wiki comment
  const createOrUpdateWikiComment = async () => {
    const { id, type } = wikiCommentsTrayCurrentWikiEntity;
    try {
      let res: WikiUserComment = null;
      if (updateComment) {
        const { data } = await editWikiComment({
          variables: {
            data: {
              comment,
              entityId: id,
              userId: dbUser?._id,
            },
          },
        });
        res = data?.editWikiComment;
        setUpdateComment(false);
        setShowCommentBox(false);
        setComment("");
      } else {
        const { data } = await crateWikiComment({
          variables: {
            data: {
              comment,
              type,
              entityId: id,
              userId: dbUser?._id,
            },
          },
        });
        res = data?.createWikiComment;
        setShowCommentBox(false);
        setComment("");
      }

      setWikiComments((prev) => ({
        ...prev,
        userComment: { ...prev?.userComment, ...res },
      }));
    } catch (error) {
      notification(
        "error",
        `Failed to ${updateComment ? "update" : "create"} comment`,
      );
    }
  };

  // Toggle comments box
  const toggleCommentBox = () => {
    setShowCommentBox((pre) => !pre);
  };

  //  get All Wiki Comments for a wiki entity

  const handleToGetAllWikiComments = async () => {
    try {
      const { data } = await getAllWikiCommentsForAWikiEntity({
        variables: {
          entityId: wikiCommentsTrayCurrentWikiEntity?.id,
          userId: dbUser?._id,
        },
      });
      const res: WikiCommentsType = data?.getAllWikiCommentsForAWikiEntity;
      setWikiComments(res);
    } catch (error) {
      notification("error", "Unable to fetch wiki entry comments");
      console.log(error);
    }
  };

  useEffect(() => {
    if (wikiCommentsTrayCurrentWikiEntity?.id && dbUser?._id) {
      handleToGetAllWikiComments();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiCommentsTrayCurrentWikiEntity?.id]);

  // if (getAllWikiCommentsLoading ) {
  //   return <SkeletonComment />;
  // }

  return (
    <TrayWrapper
      openTray={isOpenWikiCommentsTray}
      showPanle={showPanle}
      showTagByDefaut={showTagByDefaut}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faMessageDots} />}
          placeMent="left"
          hover={hover}
          handleTagClick={() => dispatch(setIsOpenWikiCommentsTray(false))}
        />
      )}
    >
      <section className={s.wikiCommentsContainer}>
        <header className={s.wikiItemName}>
          <img src={wikiCommentsTrayCurrentWikiEntity?.image} alt="img" />
          <h3>{wikiCommentsTrayCurrentWikiEntity?.title}</h3>
        </header>
      </section>

      {wikiComments?.userComment ? (
        <>
          <CommentsTopSection user={dbUser} page="wiki" />
          <CommentsBottomSection
            userComments={wikiComments?.userComment}
            updateCommentValue={updateCommentValue}
            removeComment={handleToRemoveWikiComment}
            isCurrentUser={true}
          />
        </>
      ) : (
        <CommentsTopSection user={dbUser} page="wiki" />
      )}
      {!wikiComments?.userComment && (
        <div className={s.addCommentsIcon}>
          <Tooltip direction="left" content="Add Comments">
            <IconWarper
              defaultBg="secondary"
              hover="bgSecondary"
              style={{ width: "28px", height: "28px" }}
              handleClick={toggleCommentBox}
            >
              <FontAwesomeIcon icon={faPlus} />
            </IconWarper>
          </Tooltip>
        </div>
      )}
      {showCommentBox && (
        <CommentBox
          toggleCommentBox={toggleCommentBox}
          comment={comment}
          setComment={setComment}
          createOrUpdateComment={createOrUpdateWikiComment}
          setUpdateComment={setUpdateComment}
          updateComment={updateComment}
        />
      )}

      <div className={`${s.commentsShowContainer} y-scroll`}>
        {wikiComments?.comments?.length ? (
          wikiComments?.comments?.map((comment, index) => {
            return (
              <div className={s.singleComment} key={index}>
                <CommentsTopSection user={comment?.userId} page="wiki" />
                <CommentsBottomSection
                  userComments={comment}
                  isCurrentUser={false}
                />
              </div>
            );
          })
        ) : (
          <p className={s.noComments}>
            {wikiComments?.userComment ? "No other comments " : "No comments"}
          </p>
        )}
      </div>
    </TrayWrapper>
  );
};

export default WikiCommentsTray;
