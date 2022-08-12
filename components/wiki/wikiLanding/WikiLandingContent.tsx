import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "./WikiLanding.module.scss";
import Image from "next/image";
import Carousel from "../../../theme/carousel/carousel.component";
import { WikiListType, WikiType } from "../../../type/wikiListType";
import WikiCard from "../wikiCard/WikiCard";
import SkeletonWikiDiscovery from "../../../theme/skeletons/skeletonWikiDicovery/SkeletonWikiDiscovery";
import WikiSingleType from "../wikiSingleType/WikiSingleType";
const responsiveSetting = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1380,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

interface Props {
  title?: WikiType;
  image?: string;
  loading?: boolean;
  list?: WikiListType[];
  setShowAll?: Dispatch<SetStateAction<WikiType>>;
}

const WikiLandingContent = ({
  image = "",
  list = [],
  loading = false,
  title = "",
  setShowAll = () => {},
}: Props) => {
  const sliderRef = useRef(null);
  const setting = {
    ...responsiveSetting,

    // beforeChange: (current, next) => {
    //   console.log(next);
    // },
    // afterChange: (index) => {
    //   console.log(index);
    // },
  };
  return (
    <div className={styles.main__slider}>
      <h3>
        <div className={styles.title}>
          <Image
            src={image}
            alt={"Icon"}
            layout="fixed"
            objectFit={"contain"}
            quality={100}
            height={30}
            width={30}
          />
          {title}
        </div>
        <div className={styles.viewAll} onClick={() => setShowAll(title)}>
          View All
        </div>
      </h3>

      {loading ? (
        <SkeletonWikiDiscovery />
      ) : (
        <Carousel moreSetting={setting} ref={sliderRef}>
          {list?.map((wikiList) => {
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
                portions={portions}
                id={_id}
                hasInCompare={hasInCompare}
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
};
export default WikiLandingContent;
