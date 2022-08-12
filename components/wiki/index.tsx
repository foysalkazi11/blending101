import { faBooks } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
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

export type SelectedWikiType = {
  [key in WikiType]: string[];
};

const WikiHome = () => {
  const [selectedWikiItem, setSelectedWikiItem] =
    useLocalStorage<SelectedWikiType>("selectedWikiItem", {});
  const [type, setType] = useLocalStorage<WikiType>("type", "");
  const [openTray, setOpenTray] = useState(false);

  return (
    <AContainer
      showWikiCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.main}>
        <WikiSearchBar
          openTray={openTray}
          setOpenTray={setOpenTray}
          type={type}
        />
        <WikiBanner />
        {type ? (
          <WikiSingleType
            type={type}
            setType={setType}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        ) : (
          <WikiLanding setType={setType} />
        )}
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
          type={type}
          setType={setType}
          selectedWikiItem={selectedWikiItem}
          setSelectedWikiItem={setSelectedWikiItem}
        />
      </TrayWrapper>
    </AContainer>
  );
};

export default WikiHome;
