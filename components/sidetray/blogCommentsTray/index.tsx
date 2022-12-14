import { useLazyQuery, useMutation } from "@apollo/client";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { faMessageDots } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CREATE_BLOG_COMMENT from "../../../gqlLib/blog/query/createBlogComment";
import EDIT_BLOG_COMMENT from "../../../gqlLib/blog/query/editBlogComment";
import GET_ALL_COMMENTS_FOR_A_BLOG from "../../../gqlLib/blog/query/getAllCommentsForABlog";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsOpenBlogCommentsTray } from "../../../redux/slices/blogSlice";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import SkeletonComment from "../../../theme/skeletons/skeletonComment/SkeletonComment";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import notification from "../../utility/reactToastifyNotification";
import CommentBox from "../commentsTray/commentBox/CommentBox";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";
import CommentsBottomSection from "../wikiCommentsTray/CommentsBottomSection";
import CommentsTopSection from "../wikiCommentsTray/CommentsTopSection";
import styles from "./BlogCommentsTray.module.scss";

interface Props {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}
const BlogCommentsTray = ({
  showPanle = "right",
  showTagByDefaut = false,
}: Props) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [comment, setComment] = useState("");
  const [updateCommentId, setUpdateCommentId] = useState("");
  const { isOpenBlogCommentsTray, currentBlogForShowComments } = useAppSelector(
    (state) => state.blog,
  );
  const [
    getAllComments,
    {
      data: allCommentsData,
      loading: allCommentsLoading,
      error: allCommentsError,
    },
  ] = useLazyQuery(GET_ALL_COMMENTS_FOR_A_BLOG);
  const [crateBlogComment, { loading: createBlogCommentLoading }] =
    useMutation(CREATE_BLOG_COMMENT);
  const [editBlogComment, { loading: editBlogCommentLoading }] =
    useMutation(EDIT_BLOG_COMMENT);
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state.user);

  // update Comment value
  const updateCommentValue = (comment: string, id?: string) => {
    setUpdateComment(true);
    setComment(comment);
    setUpdateCommentId(id);
    setShowCommentBox(true);
  };

  // create or update wiki comment
  const createOrUpdateWikiComment = async () => {
    setShowCommentBox(false);
    const { id } = currentBlogForShowComments;
    try {
      let res = null;
      if (updateComment) {
        await editBlogComment({
          variables: {
            data: {
              editableObject: {
                comment,
              },
              editId: updateCommentId,
              memberId: dbUser?._id,
            },
          },
          update(cache, { data: { editBlogComment } }) {
            cache.writeQuery({
              query: GET_ALL_COMMENTS_FOR_A_BLOG,
              variables: { blogId: id },
              data: {
                getAllCommentsForABlog:
                  allCommentsData?.getAllCommentsForABlog?.map((blog) =>
                    blog?._id === editBlogComment?._id
                      ? { ...blog, ...editBlogComment }
                      : blog,
                  ),
              },
            });
          },
        });

        setUpdateComment(false);
        setComment("");
      } else {
        await crateBlogComment({
          variables: {
            data: {
              comment,
              blogId: id,
              memberId: dbUser?._id,
            },
          },
          update(cache, { data: { createBlogComment } }) {
            cache.writeQuery({
              query: GET_ALL_COMMENTS_FOR_A_BLOG,
              variables: { blogId: id },
              data: {
                getAllCommentsForABlog: [
                  createBlogComment,
                  ...allCommentsData?.getAllCommentsForABlog,
                ],
              },
            });
          },
        });
        setComment("");
      }
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

  useEffect(() => {
    if (currentBlogForShowComments?.id) {
      getAllComments({ variables: { blogId: currentBlogForShowComments?.id } });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlogForShowComments?.id]);

  return (
    <TrayWrapper
      openTray={isOpenBlogCommentsTray}
      showPanle={showPanle}
      showTagByDefaut={showTagByDefaut}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faMessageDots} />}
          placeMent="left"
          hover={hover}
          handleTagClick={() => dispatch(setIsOpenBlogCommentsTray(false))}
        />
      )}
    >
      <ToggleMenu
        toggleMenuList={["Blog Comments"]}
        variant="outlineSecondary"
      />
      <section className={styles.blogCommentsContainer}>
        <header className={styles.blogItemName}>
          <div className={styles.imgBox}>
            <Image
              src={currentBlogForShowComments?.image}
              alt="img"
              width={45}
              height={45}
              objectFit="cover"
            />
          </div>

          {/* <img src={currentBlogForShowComments?.image} alt="img" /> */}
          <h3>{currentBlogForShowComments?.title}</h3>
        </header>
      </section>
      {!showCommentBox && (
        <div className={styles.addCommentsIcon}>
          <Tooltip direction="left" content="Add Comments">
            <IconWarper
              iconColor="iconColorWhite"
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

      {editBlogCommentLoading ||
        (createBlogCommentLoading && <SkeletonComment singleComment={true} />)}

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
      {allCommentsLoading ? (
        <SkeletonComment />
      ) : (
        <div className={`${styles.commentsShowContainer} y-scroll`}>
          {allCommentsData?.getAllCommentsForABlog?.length ? (
            allCommentsData?.getAllCommentsForABlog?.map((comment, index) => {
              return (
                <div className={styles.singleComment} key={index}>
                  <CommentsTopSection user={comment?.memberId} page="wiki" />
                  <CommentsBottomSection
                    userComments={comment}
                    isCurrentUser={comment?.memberId?._id === dbUser?._id}
                    updateCommentValue={updateCommentValue}
                    // removeComment={handleToRemoveWikiComment}
                  />
                </div>
              );
            })
          ) : (
            <p className={styles.noComments}>{"No comments"}</p>
          )}
        </div>
      )}
    </TrayWrapper>
  );
};

export default BlogCommentsTray;
