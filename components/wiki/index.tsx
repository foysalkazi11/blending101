import { faBooks } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AContainer from "../../containers/A.container";
import useLocalStorage from "../../customHooks/useLocalStorage";
import { WikiType } from "../../type/wikiListType";
import TrayTag from "../sidetray/TrayTag";
import TrayWrapper from "../sidetray/TrayWrapper";
import useWindowSize from "../utility/useWindowSize";
import styles from "./wiki.module.scss";
import WikiBanner from "./wikiBanner/WikiBanner";
import WikiLeft from "./WikiLeft/WikiLeft";
import WikiSearchBar from "./wikiSearchBar/WikiSearchBar";
import WikiSingleType from "./wikiSingleType/WikiSingleType";

export type SelectedWikiType = {
  [key in WikiType]: string[];
};

const WikiHome = () => {
  const [selectedWikiItem, setSelectedWikiItem] =
    useLocalStorage<SelectedWikiType>("selectedWikiItem", {});
  const [type, setType] = useLocalStorage<WikiType>("type", "Ingredient");
  const [openTray, setOpenTray] = useState(false);
  const { width } = useWindowSize();

  const wikiLeftSide = (
    <WikiLeft
      type={type}
      setType={setType}
      selectedWikiItem={selectedWikiItem}
      setSelectedWikiItem={setSelectedWikiItem}
    />
  );

  return (
    <AContainer
      showWikiCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.main}>
        <div className={styles.left}>{wikiLeftSide}</div>
        <div className={styles.center}>
          <WikiSearchBar
            openTray={width < 1280 ? openTray : true}
            setOpenTray={width < 1280 ? setOpenTray : () => {}}
            type={type}
          />
          <WikiBanner />
          <WikiSingleType
            type={type}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        </div>
      </div>
      {width < 1280 && openTray ? (
        <TrayWrapper
          isolated={true}
          showPanle="left"
          showTagByDefaut={true}
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
          {wikiLeftSide}
        </TrayWrapper>
      ) : null}
    </AContainer>
  );
};

export default WikiHome;
