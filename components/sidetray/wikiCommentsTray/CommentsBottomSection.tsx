import React from "react";
import s from "./WikiCommentsTray.module.scss";
import { format } from "date-fns";
import { WikiUserComment } from "../../../type/wikiCommentsType";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/pro-light-svg-icons";
import { faTrash } from "@fortawesome/pro-regular-svg-icons";

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
            <IconWarper
              hover="none"
              defaultBg="gray"
              handleClick={() => updateCommentValue(userComments?.comment)}
              style={{ marginRight: "5px" }}
            >
              <FontAwesomeIcon icon={faPen} fontSize={12} />
            </IconWarper>

            <IconWarper
              hover="none"
              defaultBg="gray"
              handleClick={removeComment}
            >
              <FontAwesomeIcon icon={faTrash} fontSize={12} />
            </IconWarper>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsBottomSection;
