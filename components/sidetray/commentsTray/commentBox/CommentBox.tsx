import React from "react";
import styles from "./CommentBox.module.scss";

type CommentBoxProps = {
  toggleCommentBox: () => void;
};

const CommentBox = ({ toggleCommentBox }: CommentBoxProps) => {
  return (
    <div className={styles.commentBoxContainer}>
      <textarea />
      <div className={styles.buttonGroup}>
        <button className={styles.commentSubmitBtn}>Comment</button>
        <button className={styles.commentCancleBtn} onClick={toggleCommentBox}>
          Cancle
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
