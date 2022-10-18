import {
  faShareNodes,
  faSquareCaretUp,
} from "@fortawesome/pro-regular-svg-icons";
import {
  faCircle,
  faMessageDots as faMessageDotsSolid,
} from "@fortawesome/pro-solid-svg-icons";
import { faMessageDots as faMessageDotsLight } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import styles from "../wikiCenter.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setIsOpenWikiCommentsTray,
  setWikiCommentsCurrentIngredient,
} from "../../../../redux/slices/wikiSlice";

interface Props {
  wikiId: string;
  categroy?: string;
  author?: string;
  commentsCount?: number;
  expandAllCollapse?: boolean;
  setExpandAllCollapse?: Dispatch<SetStateAction<boolean>>;
}

const SubHeader = ({
  wikiId,
  author,
  categroy,
  commentsCount,
  expandAllCollapse = true,
  setExpandAllCollapse = () => {},
}: Props) => {
  const dispatch = useAppDispatch();
  const { isOpenWikiCommentsTray, wikiCommentsTrayCurrentWikiEntity } =
    useAppSelector((state) => state?.wiki);

  const openWikiCommentsTray = () => {
    if (!isOpenWikiCommentsTray) {
      dispatch(setIsOpenWikiCommentsTray(true));
    }
    dispatch(
      setWikiCommentsCurrentIngredient({
        ...wikiCommentsTrayCurrentWikiEntity,
        id: wikiId,
      }),
    );
  };

  return (
    <div className={styles.blendingRecipeTopOptions}>
      <div className={styles.blendingTopLeft}>
        <div className={styles.tagItemBx}>
          <p>{categroy}</p>
        </div>
        <div className={styles.authorBx}>
          <div className={styles.dotDiv}>
            <FontAwesomeIcon icon={faCircle} className={styles.dot} />
          </div>

          <div className={styles.authName}>{author}</div>
        </div>
      </div>

      <ul className={styles.subHeadingIconBoxRight}>
        <li>
          <FontAwesomeIcon
            className={`${styles.innerIcon}`}
            icon={faShareNodes}
          />
          <span className={styles.innerText}>Share</span>
        </li>
        <li onClick={() => setExpandAllCollapse((prev) => !prev)}>
          <FontAwesomeIcon
            icon={faSquareCaretUp}
            className={`${styles.innerIcon} ${
              expandAllCollapse && styles.rotatedIcon180Deg
            } ${expandAllCollapse && styles.activeIcon}`}
          />
          <span className={`${styles.innerText} `}>Expand All</span>
        </li>
        <li onClick={openWikiCommentsTray}>
          <FontAwesomeIcon
            icon={commentsCount ? faMessageDotsSolid : faMessageDotsLight}
            className={`${styles.innerIcon} ${
              commentsCount && styles.activeIcon
            }`}
          />
          <span className={`${styles.innerText} `}>{commentsCount}</span>
        </li>
      </ul>
    </div>
  );
};

export default SubHeader;
