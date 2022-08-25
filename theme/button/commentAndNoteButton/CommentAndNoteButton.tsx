import React, { ReactNode } from "react";
import styles from "./Buttons.module.scss";

type Props = {
  style?: React.CSSProperties;
  handleClick?: () => void;
  text?: string | ReactNode;
  type: "submitBtn" | "cancleBtn";
  submitBtnVarient?: "primary" | "secondary";
};

const CommentAndNoteButton = ({
  style = {},
  handleClick = () => {},
  text = "Submit",
  type = "submitBtn",
  submitBtnVarient = "primary",
}: Props) => {
  return (
    <button
      className={`${styles[type]} ${
        type === "submitBtn" && styles[submitBtnVarient]
      }`}
      style={style}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default CommentAndNoteButton;
