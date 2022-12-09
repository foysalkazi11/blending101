import { useRef, useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import IconButton from "../../../../component/atoms/Button/IconButton.component";
import { BlogListType } from "../../../../type/blog";
import styles from "./BlogCard.module.scss";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import time_ago from "../../../../helperFunc/date/time_ago";
import Image from "next/image";
// import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { faBookmark, faMessageDots } from "@fortawesome/pro-light-svg-icons";
import { useRouter } from "next/router";

interface Props {
  blogData: BlogListType;
}

const BlogCard = ({ blogData }: Props) => {
  const { coverImage, title, type, createdBy, publishDate, mediaUrl, slug } =
    blogData;
  const [play, setPlay] = useState(false);
  const titleWidth = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const togglePlay = (status: boolean = false) => {
    setPlay(status);
  };
  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.coverImage}
        style={{ backgroundImage: `url(${coverImage})` }}
        onMouseEnter={() => togglePlay(true)}
        onMouseLeave={() => togglePlay(false)}
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
            <audio controls autoPlay>
              <source src={mediaUrl} />
              Your browser does not support the video tag.
            </audio>
          </div>
        )}
        {type === "video" && play && (
          <div
            className={styles.playButton}
            style={{ top: `${titleWidth?.current?.clientHeight || 34}px` }}
          >
            <video
              width="100%"
              height="100%"
              controls
              autoPlay

              // onMouseLeave={() => setPlay(false)}
            >
              <source src={mediaUrl} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
      <div className={styles.authorAndDate}>
        <p>Gabriel Branu</p>
        <p>{time_ago(publishDate)}</p>
      </div>
      <div className={styles.authorAndDate}>
        <div className={styles.brandBox}>
          <Image src={"/logo_small.svg"} alt="logo" width={16} height={16} />
          <p className={styles.brandName}>Blending 101</p>
        </div>
        <div className={styles.brandBox}>
          <FontAwesomeIcon icon={faBookmark} />
          <FontAwesomeIcon icon={faMessageDots} className={styles.brandName} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
