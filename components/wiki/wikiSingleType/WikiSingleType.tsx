import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { MdOutlineStarOutline } from "react-icons/md";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { WikiListType } from "../../../type/wikiListType";
import WikiCard from "../wikiCard/WikiCard";
import styles from "./WikiSingleType.module.scss";

interface Props {
  type?: string;
  data?: WikiListType[];
}

const WikiSingleType = ({ type = "", data = [] }: Props) => {
  return (
    <div className={styles.showRecipeCollectionsContainer}>
      <div className={styles.showRecipeCollectionsHeader}>
        <div className={styles.heading}>
          <MdOutlineStarOutline className={styles.favoriteIcon} />

          <h2>{type}</h2>
        </div>

        <IconWarper
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "28px", height: "28px" }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconWarper>
      </div>
      <div className={styles.showRecipes}>
        {data?.length
          ? data?.map((wikiList, index) => {
              const {
                _id,
                category,
                commentsCount,
                description,
                hasInCompare,
                image,
                isPublished,
                portions,
                publishedBy,
                status,
                type,
                wikiDescription,
                wikiTitle,
              } = wikiList;
              return (
                <WikiCard
                  key={_id}
                  author={publishedBy}
                  comments={commentsCount}
                  description={wikiDescription}
                  image={image}
                  title={wikiTitle}
                  type={type}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default WikiSingleType;
