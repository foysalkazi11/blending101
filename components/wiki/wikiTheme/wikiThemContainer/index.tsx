import React from "react";
import generateDummyArray from "../../../../helperFunc/array/generateDummyArray";
import WikiThemeCard from "../wikiThemeCard";
import styles from "./WikiThemeContainer.module.scss";
import { useQuery } from "@apollo/client";
import GET_WIKI_THEME from "gqlLib/wiki/query/getWikiTheme";
import { useUser } from "context/AuthProvider";

interface WikiThemeContainerProps {
  data?: any[];
  loading?: boolean;
  scrollAreaMaxHeight?: number;
  wikiThemeOnClick?: (data: { [key: string]: any }) => void;
  checkActiveWiki?: (id: string) => boolean;
}
const WikiThemeContainer = ({
  // data = generateDummyArray(10, { title: "Apple", image: "/images/apple.png" }),
  // loading = false,
  scrollAreaMaxHeight,
  wikiThemeOnClick = () => {},
  checkActiveWiki = () => false,
}: WikiThemeContainerProps) => {
  const user = useUser();
  const { data, loading } = useQuery(GET_WIKI_THEME, {
    variables: { widgetSlug: "wiki-summer", userId: user?.id, currentDate: new Date().toISOString().slice(0, 10) },
  });
  return (
    <div className={`${styles.wikiThemeContainer} y-scroll`} style={{ maxHeight: `${scrollAreaMaxHeight || 500}px` }}>
      {data?.getEntityWidget?.widgetCollections?.map((item, index) => {
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
