import React from "react";
import styles from "./WikiLanding.module.scss";
import Image from "next/image";
import Carousel from "../../../theme/carousel/carousel.component";
import { WikiListType } from "../../../type/wikiListType";
import WikiCard from "../wikiCard/WikiCard";
import SkeletonWikiDiscovery from "../../../theme/skeletons/skeletonWikiDicovery/SkeletonWikiDiscovery";
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
  title?: string;
  image?: string;
  loading?: boolean;
  list?: WikiListType[];
}

const WikiLandingContent = ({ image, list, loading, title }: Props) => {
  const setting = {
    ...responsiveSetting,
    afterChange: (index) => {
      console.log(index);
    },
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
        <div className={styles.viewAll}>View All</div>
      </h3>

      {loading ? (
        <SkeletonWikiDiscovery />
      ) : (
        <Carousel moreSetting={setting}>
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
