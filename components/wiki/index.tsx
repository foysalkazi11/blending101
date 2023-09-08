import { faBooks } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import useLocalStorage from "../../customHooks/useLocalStorage";
import { WikiType } from "../../type/wikiListType";
import TrayTag from "../sidetray/TrayTag";
import TrayWrapper from "../sidetray/TrayWrapper";
import styles from "./wiki.module.scss";
import WikiLanding from "./wikiLanding/WikiLanding";
import WikiLeft from "./WikiLeft/WikiLeft";
import WikiSingleType from "./wikiSingleType/WikiSingleType";
import { useRouter } from "next/router";
import WikiSingleItem from "./wikiSingleItem/WikiSingleItem";
import useWindowSize from "../utility/useWindowSize";
import WikiCommentsTray from "../sidetray/wikiCommentsTray";

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
  const { width } = useWindowSize();

  // render ui
  const renderUI = (wikiType, type) => {
    let component = null;
    if (wikiType) {
      component = <WikiSingleItem />;
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
    <Fragment>
      <WikiCommentsTray showTagByDefaut={false} showPanle={"right"} />
      <div className={styles.wikiPageContainer}>
        {/* <WikiSearchBar
          openTray={openTray}
          setOpenTray={setOpenTray}
          type={type}
        /> */}
        {/* <WikiBanner /> */}

        <div className={styles.wikiContentContainer}>
          <div className={styles.left}>
            <WikiLeft
              currentWikiType={wikiType as WikiType}
              currentWikiId={wikiId}
              selectedWikiItem={selectedWikiItem}
              setSelectedWikiItem={setSelectedWikiItem}
              showWikiTypeHeader={false}
            />
          </div>
          <div className={styles.center}>{renderUI(wikiType, type)}</div>
        </div>
      </div>
      {width < 1280 && (
        <TrayWrapper
          isolated={true}
          showPanel="left"
          showTagByDefault={width < 1280 ? true : false}
          openTray={openTray}
          panelTag={(hover) => (
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
      )}
    </Fragment>
  );
};

export default WikiHome;
