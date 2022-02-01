import React, { Dispatch, SetStateAction } from "react";
import CancleBtn from "../buttons/CancleBtn";
import SubmitBtn from "../buttons/SubmitBtn";
import styles from "./CommentBox.module.scss";

type CommentBoxProps = {
  toggleCommentBox: () => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  createOrUpdateComment: () => void;
  setUpdateComment: Dispatch<SetStateAction<boolean>>;
  updateComment: boolean;
};

const CommentBox = ({
  toggleCommentBox,
  setComment,
  comment,
  createOrUpdateComment,
  setUpdateComment,
  updateComment,
}: CommentBoxProps) => {
  return (
    <div className={styles.commentBoxContainer}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e?.target?.value)}
      />
      <div className={styles.buttonGroup}>
        <SubmitBtn
          text={updateComment ? "Update" : "Comment"}
          style={{ background: "#fe5d1f", boxShadow: "5px 5px 15px #fe5d1f38" }}
          handleClick={createOrUpdateComment}
        />
        <CancleBtn
          text="Cancle"
          handleClick={() => {
            toggleCommentBox();
            setUpdateComment(false);
          }}
        />
      </div>
    </div>
  );
};

export default CommentBox;
