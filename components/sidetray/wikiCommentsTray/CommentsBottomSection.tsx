import React from "react";
import s from "./WikiCommentsTray.module.scss";
import { format } from "date-fns";
import { WikiUserComment } from "../../../type/wikiCommentsType";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  userComments?: WikiUserComment;
  updateCommentValue?: (agr: string) => void;
  removeComment?: () => void;
  isCurrentUser?: boolean;
}

const CommentsBottomSection = ({
  userComments,
  updateCommentValue = () => {},
  removeComment = () => {},
  isCurrentUser = false,
}: Props) => {
  return (
    <div className={s.bottomSection}>
      <p className={s.comment}>{userComments?.comment}</p>
      <span className={s.date}>
        {userComments?.updatedAt ? (
          <>
            {format(new Date(userComments?.updatedAt), "dd/MM/yyyy")} (edited)
          </>
        ) : (
          userComments?.createdAt &&
          format(new Date(userComments?.createdAt), "dd/MM/yyyy")
        )}
      </span>

      {isCurrentUser && (
        <div className={s.rightSide}>
          <div className={s.content}>
            <div
              className={s.editIconBox}
              onClick={() => updateCommentValue(userComments?.comment)}
            >
              <FiEdit2 className={s.icon} />
            </div>
            <div className={s.editIconBox} onClick={removeComment}>
              <MdDeleteOutline className={s.icon} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsBottomSection;
