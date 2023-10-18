import React from "react";
import generateDummyArray from "../../../../helperFunc/array/generateDummyArray";
import WikiThemeCard from "../wikiThemeCard";
import styles from "./WikiThemeContainer.module.scss";
import SkeletonWikiTheme from "theme/skeletons/skeletonWikiTheme";

interface WikiThemeContainerProps {
  data?: any[];
  loading?: boolean;
  scrollAreaMaxHeight?: number;
  wikiThemeOnClick?: (data: { [key: string]: any }) => void;
  checkActiveWiki?: (id: string) => boolean;
}
const WikiThemeContainer = ({
  data = generateDummyArray(10, { title: "Apple", image: "/images/apple.png" }),
  loading = false,
  scrollAreaMaxHeight,
  wikiThemeOnClick = () => {},
  checkActiveWiki = () => false,
}: WikiThemeContainerProps) => {
  if (loading) {
    return <SkeletonWikiTheme />;
  }
  return (
    <div className={`${styles.wikiThemeContainer} y-scroll`} style={{ maxHeight: `${scrollAreaMaxHeight || 500}px` }}>
      {data?.map((item, index) => {
        const { _id, icon, displayName, data } = item;
        return (
          <WikiThemeCard
            key={index + _id}
            image={icon}
            title={displayName}
            id={_id}
            data={item}
            onClick={wikiThemeOnClick}
            isCurrentlyActiveTheme={checkActiveWiki}
          />
        );
      })}
    </div>
  );
};

export default WikiThemeContainer;
