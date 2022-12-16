import React from "react";
import s from "./WikiCommentsTray.module.scss";
import { format } from "date-fns";
import { WikiUserComment } from "../../../type/wikiCommentsType";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/pro-light-svg-icons";
import { faTrash } from "@fortawesome/pro-regular-svg-icons";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";

interface Props {
  userComments?: WikiUserComment;
  updateCommentValue?: (agr: string, id?: string) => void;
  removeComment?: (id: string) => void;
  isCurrentUser?: boolean;
  deleteCommentLoading?: boolean;
}

const CommentsBottomSection = ({
  userComments,
  updateCommentValue = () => {},
  removeComment = () => {},
  isCurrentUser = false,
  deleteCommentLoading = false,
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
              handleClick={() =>
                updateCommentValue(userComments?.comment, userComments?._id)
              }
              style={{ marginRight: "5px" }}
            >
              <FontAwesomeIcon icon={faPen} fontSize={12} />
            </IconWarper>

            <IconWarper
              hover="none"
              defaultBg="gray"
              handleClick={() => removeComment(userComments?._id)}
            >
              {deleteCommentLoading ? (
                <CircularRotatingLoader
                  color="white"
                  style={{ fontSize: "16px" }}
                />
              ) : (
                <FontAwesomeIcon icon={faTrash} fontSize={12} />
              )}
            </IconWarper>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsBottomSection;
