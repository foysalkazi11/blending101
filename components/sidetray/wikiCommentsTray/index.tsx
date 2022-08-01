import { useLazyQuery, useMutation } from "@apollo/client";
import { faMessageDots, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import CREATE_WIKI_COMMENT from "../../../gqlLib/wiki/mutation/createWikiComment";
import GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY from "../../../gqlLib/wiki/query/getAllWikiCommentsForAWikiEntity";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsOpenWikiCommentsTray } from "../../../redux/slices/wikiSlice";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import SkeletonComment from "../../../theme/skeletons/skeletonComment/SkeletonComment";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import notification from "../../utility/reactToastifyNotification";
import CommentBox from "../commentsTray/commentBox/CommentBox";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";
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
  const [rating, setRating] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [updateCommentId, setUpdateCommentId] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const { isOpenWikiCommentsTray, wikiCommentsTrayCurrentWikiEntity } =
    useAppSelector((state) => state?.wiki);
  const { dbUser } = useAppSelector((state) => state?.user);
  const [
    getAllWikiCommentsForAWikiEntity,
    {
      data: getAllWikiCommentsData,
      loading: getAllWikiCommentsLoading,
      error: getAllWikiCommentsError,
    },
  ] = useLazyQuery(GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY);
  const [
    crateWikiComment,
    {
      data: createWikiCommentData,
      loading: createWikiCommentLoading,
      error: createWikiCommentError,
    },
  ] = useMutation(CREATE_WIKI_COMMENT);

  console.log(getAllWikiCommentsData);

  // create or update wiki comment

  const createOrUpdateWikiComment = async () => {
    const { id, type } = wikiCommentsTrayCurrentWikiEntity;
    try {
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

      console.log(data);
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

  useEffect(() => {
    if (wikiCommentsTrayCurrentWikiEntity?.id) {
      getAllWikiCommentsForAWikiEntity({
        variables: { entityId: wikiCommentsTrayCurrentWikiEntity?.id },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiCommentsTrayCurrentWikiEntity?.id]);

  if (getAllWikiCommentsLoading || createWikiCommentLoading) {
    return <SkeletonComment />;
  }

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
      <CommentsTopSection rating={rating} setRating={setRating} user={dbUser} />
      {!showCommentBox && (
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
    </TrayWrapper>
  );
};

export default WikiCommentsTray;
