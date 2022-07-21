import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import AContainer from "../../containers/A.container";
import GET_WIKI_LIST from "../../gqlLib/wiki/query/getWikiList";
import styles from "./wiki.module.scss";
import WikiCard from "./wikiCard/WikiCard";
import WikiLanding from "./wikiLanding/WikiLanding";
import WikiLeft from "./WikiLeft/WikiLeft";
import WikiSingleItem from "./wikiSingleItem/WikiSingleItem";
import WikiSingleType from "./wikiSingleType/WikiSingleType";

const WikiHome = () => {
  const [selectedWikiItem, setSelectedWikiItem] = useState<string[]>([]);
  const router = useRouter();
  const [type, setType] = useState("Ingredient");
  // const { params = [] } = router?.query;
  // const type = params?.[0] || "Ingredient";
  // const wikiId = params?.[1] || "";
  // const measurementWeight = params?.[2] || "";
  const {
    data: wikiListData,
    loading: wikiListLoading,
    error: wikiListError,
  } = useQuery(GET_WIKI_LIST);

  const filterType = useMemo(
    () =>
      wikiListData?.getWikiList?.filter(
        (item) => item?.type === (type === "Nutrition" ? "Nutrient" : type),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type, wikiListData?.getWikiList],
  );

  return (
    <AContainer>
      <div className={styles.main}>
        <div className={styles.left}>
          <WikiLeft
            type={type}
            setType={setType}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        </div>
        <div className={styles.center}>
          <WikiSingleType
            type={type}
            data={filterType}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
            loading={wikiListLoading}
          />
        </div>
      </div>
    </AContainer>
  );
};

export default WikiHome;
