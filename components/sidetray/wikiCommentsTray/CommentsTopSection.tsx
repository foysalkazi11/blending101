import React, { Dispatch, SetStateAction } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline, MdPersonOutline } from "react-icons/md";
import StarRating from "../../../theme/starRating/StarRating";
import styles from "./WikiCommentsTray.module.scss";

interface Props {
  user?: any;
  rating?: number;
  setRating?: Dispatch<SetStateAction<number>>;
  isAbleToSetRating?: boolean;
  userRating?: number;
  page?: "wiki" | "blog" | "recipe";
}

const CommentsTopSection = ({
  rating = 1,
  setRating = () => {},
  user = {},
  isAbleToSetRating = true,
  userRating = 0,
  page = "recipe",
}: Props) => {
  return (
    <div className={styles.userImage}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.imageBox}>
          {user?.image ? (
            <img src={user?.image} alt="user_img" />
          ) : (
            <MdPersonOutline />
          )}
        </div>
        <h6 className={styles.userName}>
          {user?.displayName ||
            user?.lastName ||
            user?.firstName ||
            user?.email}
        </h6>
      </div>
      {page === "recipe" && (
        <StarRating
          rating={isAbleToSetRating ? rating : userRating}
          setRating={setRating}
          isAbleToSetRating={isAbleToSetRating}
        />
      )}
    </div>
  );
};

export default CommentsTopSection;
