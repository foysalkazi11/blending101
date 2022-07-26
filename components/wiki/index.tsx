import { faBooks } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AContainer from "../../containers/A.container";
import useLocalStorage from "../../customHooks/useLocalStorage";
import TrayTag from "../sidetray/TrayTag";
import TrayWrapper from "../sidetray/TrayWrapper";
import useWindowSize from "../utility/useWindowSize";
import styles from "./wiki.module.scss";
import WikiBanner from "./wikiBanner/WikiBanner";
import WikiLeft from "./WikiLeft/WikiLeft";
import WikiSearchBar from "./wikiSearchBar/WikiSearchBar";
import WikiSingleType from "./wikiSingleType/WikiSingleType";

export type Type = "Nutrient" | "Ingredient" | "Health";
export type SelectedWikiType = {
  [key in Type]: string[];
};

const WikiHome = () => {
  const [selectedWikiItem, setSelectedWikiItem] =
    useLocalStorage<SelectedWikiType>("selectedWikiItem", {});
  const [type, setType] = useLocalStorage<Type>("type", "Ingredient");
  const [openTray, setOpenTray] = useState(false);
  const { width } = useWindowSize();

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
          <WikiSearchBar />
          <WikiBanner />
          <WikiSingleType
            type={type}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        </div>
      </div>
      {width < 1280 ? (
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
          <WikiLeft
            type={type}
            setType={setType}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        </TrayWrapper>
      ) : null}
    </AContainer>
  );
};

export default WikiHome;
