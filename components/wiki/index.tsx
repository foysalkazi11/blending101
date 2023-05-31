import { faBooks } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AContainer from "../../containers/A.container";
import useLocalStorage from "../../customHooks/useLocalStorage";
import { WikiType } from "../../type/wikiListType";
import TrayTag from "../sidetray/TrayTag";
import TrayWrapper from "../sidetray/TrayWrapper";
import styles from "./wiki.module.scss";
import WikiBanner from "./wikiBanner/WikiBanner";
import WikiLanding from "./wikiLanding/WikiLanding";
import WikiLeft from "./WikiLeft/WikiLeft";
import WikiSearchBar from "./wikiSearchBar/WikiSearchBar";
import WikiSingleType from "./wikiSingleType/WikiSingleType";
import { useRouter } from "next/router";
import WikiSingleItem from "./wikiSingleItem/WikiSingleItem";
import WikiCompare from "./wikiCompare/WikiCompare";

export type SelectedWikiType = {
  [key in WikiType]: string;
};

const WikiHome = () => {
  const [selectedWikiItem, setSelectedWikiItem] =
    useLocalStorage<SelectedWikiType>("selectedWikiItem", {});
  const [type, setType] = useLocalStorage<WikiType>("type", "");
  const [openTray, setOpenTray] = useState(false);
  const router = useRouter();
  const { params = [] } = router?.query;
  const wikiType: string = params?.[0] || "";
  const wikiId = params?.[1] || "";

  // change title info
  const changeTitleInfo = (wikiType: string) => {
    let obj = { title: "", description: "" };
    if (wikiType && wikiType !== "compare") {
      obj = {
        title: `Wiki Details`,
        description: `Wiki Details`,
      };
    } else if (wikiType && wikiType === "compare") {
      obj = {
        title: "Wiki Compare",
        description: "Wiki compare with each others",
      };
    } else {
      obj = {
        title: `Wiki Discovery`,
        description: `Wiki Discovery
`,
      };
    }
    return obj;
  };

  // render ui
  const renderUI = (wikiType, type) => {
    let component = null;
    if (wikiType) {
      if (wikiType === "compare") {
        component = <WikiCompare />;
      } else {
        component = <WikiSingleItem />;
      }
    } else {
      if (type) {
        component = (
          <WikiSingleType
            type={type}
            setType={setType}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        );
      } else {
        component = (
          <WikiLanding
            setType={setType}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        );
      }
    }

    return component;
  };

  return (
    <AContainer
      headerTitle={changeTitleInfo(wikiType).title}
      headerIcon={"/icons/books.svg"}
      showWikiCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      headTagInfo={changeTitleInfo(wikiType)}
    >
      <div className={styles.main}>
        <WikiSearchBar
          openTray={openTray}
          setOpenTray={setOpenTray}
          type={type}
        />
        {!wikiType && <WikiBanner />}

        {renderUI(wikiType, type)}
      </div>

      <TrayWrapper
        isolated={true}
        showPanle="left"
        showTagByDefaut={false}
        openTray={openTray}
        panleTag={(hover) => (
          <TrayTag
            hover={hover}
            icon={<FontAwesomeIcon icon={faBooks} />}
            placeMent="left"
            handleTagClick={() => setOpenTray((prev) => !prev)}
          />
        )}
      >
        <WikiLeft
          currentWikiType={wikiType as WikiType}
          currentWikiId={wikiId}
          selectedWikiItem={selectedWikiItem}
          setSelectedWikiItem={setSelectedWikiItem}
        />
      </TrayWrapper>
    </AContainer>
  );
};

export default WikiHome;
