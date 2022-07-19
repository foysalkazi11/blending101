import React, { useEffect, useState } from "react";
import { WikiListType } from "../../../type/wikiListType";
import ContentTray from "../../recipe/recipeDiscovery/ContentTray/ContentTray.component";
import WikiCard from "../wikiCard/WikiCard";
import s from "./WikiLanding.module.scss";

interface WikiLandingProps {
  wikiList?: WikiListType[];
  wikiLoading?: boolean;
}

interface NormalizeWikiList {
  type: string;
  data: WikiListType[];
}

const WikiLanding = ({
  wikiList = [],
  wikiLoading = false,
}: WikiLandingProps) => {
  const [normalizeWikiList, setNormalizeWikiList] = useState<
    NormalizeWikiList[]
  >([]);
  useEffect(() => {
    const checkData = (previous, current) => {
      if (previous) {
        return [...previous, current];
      } else {
        return [current];
      }
    };
    let obj = {};
    if (!wikiLoading && wikiList?.length) {
      wikiList?.forEach((wiki) => {
        obj[wiki?.type] = [...checkData(obj[wiki?.type], wiki)];
      });
    }

    const mapData = Object.entries(obj)?.map((wiki) => ({
      type: wiki[0],
      data: wiki[1] as WikiListType[],
    }));
    setNormalizeWikiList(mapData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiList]);
  return (
    <div>
      {normalizeWikiList?.map((wiki) => {
        return (
          <ContentTray
            key={wiki?.type}
            heading={wiki?.type}
            image={"/images/thumbs-up.svg"}
          >
            {wiki?.data?.map((wikiList) => {
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
            })}
          </ContentTray>
        );
      })}
    </div>
  );
};

export default WikiLanding;
