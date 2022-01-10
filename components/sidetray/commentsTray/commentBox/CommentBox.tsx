import React from "react";
import CancleBtn from "../buttons/CancleBtn";
import SubmitBtn from "../buttons/SubmitBtn";
import styles from "./CommentBox.module.scss";

type CommentBoxProps = {
  toggleCommentBox: () => void;
};

const CommentBox = ({ toggleCommentBox }: CommentBoxProps) => {
  return (
    <div className={styles.commentBoxContainer}>
      <textarea />
      <div className={styles.buttonGroup}>
        <SubmitBtn
          text="Comment"
          style={{ background: "#fe5d1f", boxShadow: "5px 5px 15px #fe5d1f38" }}
        />
        <CancleBtn text="Cancle" handleClick={toggleCommentBox} />
      </div>
    </div>
  );
};

export default CommentBox;
