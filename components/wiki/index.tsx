import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AContainer from "../../containers/A.container";
import GET_WIKI_LIST from "../../gqlLib/wiki/query/getWikiList";
import styles from "./wiki.module.scss";
import WikiCard from "./wikiCard/WikiCard";
import WikiLanding from "./wikiLanding/WikiLanding";
import WikiLeft from "./WikiLeft/WikiLeft";
import WikiSingleItem from "./wikiSingleItem/WikiSingleItem";
import WikiSingleType from "./wikiSingleType/WikiSingleType";

const WikiHome = () => {
  const [currentWikiType, setCurrentWikiType] = useState("");
  const router = useRouter();
  const { params = [] } = router?.query;
  const type = params?.[0] || "";
  const wikiId = params?.[1] || "";
  const measurementWeight = params?.[2] || "";

  const {
    data: wikiListData,
    loading: wikiListLoading,
    error: wikiListError,
  } = useQuery(GET_WIKI_LIST);

  const renderUi = (params: any = []) => {
    const [type, wikiId, measurementWeight] = params;
    if (type && wikiId) {
      return (
        <WikiSingleItem
          measurementWeight={measurementWeight}
          type={type}
          wikiId={wikiId}
        />
      );
    } else if (type && !wikiId) {
      return (
        <WikiSingleType
          type={type}
          data={wikiListData?.getWikiList?.filter(
            (item) => item?.type === (type === "Nutrition" ? "Nutrient" : type),
          )}
        />
      );
    } else {
      return (
        <WikiLanding
          wikiList={wikiListData?.getWikiList}
          wikiLoading={wikiListLoading}
        />
      );
    }
  };

  return (
    <AContainer>
      <div className={styles.main}>
        <div className={styles.left}>
          <WikiLeft type={type} wikiId={wikiId} />
        </div>
        <div className={styles.center}>{renderUi(params)}</div>
      </div>
    </AContainer>
  );
};

export default WikiHome;
