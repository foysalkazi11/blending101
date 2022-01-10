/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MdPersonOutline } from "react-icons/md";
import { useAppSelector } from "../../../../redux/hooks";
import CommentBox from "../commentBox/CommentBox";
import styles from "./CommentSection.module.scss";

const dammyCommentsArray = [
  {
    name: "Iris Loo",
    comment:
      "I love this recipe because I enjoy clean simple flavours. I paired it with spicy crumbly tempeh.",
    data: "27/5/2021",
  },
  {
    name: "Iris Loo",
    comment:
      "I love this recipe because I enjoy clean simple flavours. I paired it with spicy crumbly tempeh.",
    data: "27/5/2021",
  },
  {
    name: "Iris Loo",
    comment:
      "I love this recipe because I enjoy clean simple flavours. I paired it with spicy crumbly tempeh.",
    data: "27/5/2021",
  },
  {
    name: "Iris Loo",
    comment:
      "I love this recipe because I enjoy clean simple flavours. I paired it with spicy crumbly tempeh.",
    data: "27/5/2021",
  },
  {
    name: "Iris Loo",
    comment:
      "I love this recipe because I enjoy clean simple flavours. I paired it with spicy crumbly tempeh.",
    data: "27/5/2021",
  },
  {
    name: "Iris Loo",
    comment:
      "I love this recipe because I enjoy clean simple flavours. I paired it with spicy crumbly tempeh.",
    data: "27/5/2021",
  },
  {
    name: "Iris Loo",
    comment:
      "I love this recipe because I enjoy clean simple flavours. I paired it with spicy crumbly tempeh.",
    data: "27/5/2021",
  },
  {
    name: "Iris Loo",
    comment:
      "I love this recipe because I enjoy clean simple flavours. I paired it with spicy crumbly tempeh.",
    data: "27/5/2021",
  },
  {
    name: "Iris Loo",
    comment:
      "I love this recipe because I enjoy clean simple flavours. I paired it with spicy crumbly tempeh.",
    data: "27/5/2021",
  },
];

const CommentSection = () => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const { user, dbUser } = useAppSelector((state) => state?.user);

  const toggleCommentBox = () => {
    setShowCommentBox((pre) => !pre);
  };
  return (
    <div>
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
        <img src="/images/star.png" alt="star-imag" />
      </div>
      {showCommentBox ? (
        <CommentBox toggleCommentBox={toggleCommentBox} />
      ) : null}
      <div className={styles.commentsIconBox}>
        <span>112 comments</span>
        {showCommentBox ? null : (
          <button onClick={toggleCommentBox}>
            <img src="/images/plus-white-icon.svg" alt="add-icon" />
            <span>Add</span>
          </button>
        )}
      </div>
      <div className={`${styles.commentsShowContainer} y-scroll`}>
        {dammyCommentsArray?.map((comment, index) => {
          return (
            <div className={styles.singleComment} key={index}>
              <div className={styles.header}>
                <div className={styles.leftSide}>
                  <div className={styles.userIcon}>
                    <MdPersonOutline />
                  </div>
                  <h6>{comment?.name}</h6>
                </div>
                <img src="/images/start-bgbg.png" alt="star_icon" />
              </div>
              <p>{comment?.comment}</p>
              <span>{comment?.data}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
