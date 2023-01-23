import { useRef, useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlogListType } from "../../../../type/blog";
import styles from "./BlogCard.module.scss";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import time_ago from "../../../../helperFunc/date/time_ago";
import Image from "next/image";
import {
  faMessageDots as faMessageDotsSolid,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/pro-solid-svg-icons";
import {
  faMessageDots as faMessageDotsLight,
  faBookmark as faBookmarkLight,
} from "@fortawesome/pro-light-svg-icons";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setIsOpenBlogCollectionTray,
  setIsOpenBlogCommentsTray,
  updateCurrentBlogForShowComments,
  setIsActiveBlogForCollection,
} from "../../../../redux/slices/blogSlice";
import useToAddBlogCollection from "../../../../customHooks/blog/useToAddBlogCollection";

interface Props {
  blogData: BlogListType;
  setOpenLastModifiedCollectionModal?: (arg: boolean) => void;
}

const BlogCard = ({
  blogData,
  setOpenLastModifiedCollectionModal = () => {},
}: Props) => {
  const {
    coverImage,
    title,
    type,
    createdBy,
    publishDate,
    mediaUrl,
    slug,
    _id,
    commentsCount,
    blogCollections,
  } = blogData;

  const [play, setPlay] = useState(false);
  const titleWidth = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleToAddBlogAtCollection = useToAddBlogCollection();
  const memberId = useAppSelector((state) => state?.user?.dbUser?._id || "");

  const togglePlay = (status: boolean = false) => {
    setPlay(status);
  };

  const handleOpenCollectionTray = (id: string, collectionIds: string[]) => {
    dispatch(setIsActiveBlogForCollection({ id, collectionIds }));
    dispatch(setIsOpenBlogCollectionTray(true));
  };
  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.coverImage}
        style={{ backgroundImage: `url(${coverImage})` }}
        onMouseEnter={() =>
          (type === "audio" || type === "video") && togglePlay(true)
        }
        onMouseLeave={() =>
          (type === "audio" || type === "video") && togglePlay(false)
        }
      >
        <div className={styles.titleBox} ref={titleWidth}>
          <p
            className={styles.title}
            onClick={() => router.push(`/blog/${slug}`)}
          >
            {title}
          </p>
        </div>

        {(type === "audio" || type === "video") && !play && (
          <div className={styles.playButton}>
            <IconWarper
              // handleClick={() => router?.push(backLink)}
              iconColor="iconColorWhite"
              defaultBg="primary"
              style={{ width: "40px", height: "40px" }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </IconWarper>
          </div>
        )}
        {type === "audio" && play && (
          <div
            className={styles.playButton}
            style={{ top: `${titleWidth?.current?.clientHeight || 34}px` }}
          >
            <audio controls autoPlay muted>
              <source src={mediaUrl} />
              Your browser does not support the video tag.
            </audio>
          </div>
        )}
        {type === "video" && play && (
          <video
            className={`${styles.playButton} ${styles.videoBox}`}
            onClick={() => router.push(`/blog/${slug}`)}
            width="100%"
            height="100%"
            controls
            autoPlay
            muted
            // onMouseLeave={() => setPlay(false)}
          >
            <source src={mediaUrl} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className={styles.authorAndDate}>
        <p>{createdBy}</p>
        <p>{time_ago(publishDate)}</p>
      </div>
      <div className={styles.authorAndDate}>
        <div className={styles.brandBox}>
          <Image src={"/logo_small.svg"} alt="logo" width={16} height={16} />
          <p className={styles.brandName}>Blending 101</p>
        </div>
        <div className={styles.brandBox}>
          <FontAwesomeIcon
            icon={blogCollections?.length ? faBookmarkSolid : faBookmarkLight}
            className={`${styles.icon} ${
              blogCollections?.length ? styles.activeIconPrimary : ""
            }`}
            onClick={() => {
              blogCollections?.length
                ? handleOpenCollectionTray(_id, blogCollections)
                : handleToAddBlogAtCollection(
                    _id,
                    memberId,
                    setOpenLastModifiedCollectionModal,
                  );
            }}
          />
          <FontAwesomeIcon
            icon={commentsCount ? faMessageDotsSolid : faMessageDotsLight}
            className={`${styles.icon} ${
              commentsCount ? styles.activeIconSecondary : ""
            }`}
            onClick={() => {
              dispatch(
                updateCurrentBlogForShowComments({
                  id: _id,
                  image: coverImage,
                  title,
                }),
              );
              dispatch(setIsOpenBlogCommentsTray(true));
            }}
          />
          {commentsCount ? (
            <p
              className={`${styles.text} ${
                commentsCount ? styles.activeIcon : ""
              }`}
            >
              {commentsCount}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
