import { faBooks } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AContainer from "../../containers/A.container";
import TrayTag from "../sidetray/TrayTag";
import TrayWrapper from "../sidetray/TrayWrapper";
import useWindowSize from "../utility/useWindowSize";
import styles from "./wiki.module.scss";
import WikiLeft from "./WikiLeft/WikiLeft";
import WikiSingleType from "./wikiSingleType/WikiSingleType";

export type Type = "Nutrient" | "Ingredient" | "Health";

const WikiHome = () => {
  const [selectedWikiItem, setSelectedWikiItem] = useState<string[]>([]);
  const [type, setType] = useState<Type>("Ingredient");
  const [openTray, setOpenTray] = useState(true);
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
          <WikiSingleType
            type={type}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        </div>
      </div>
      <TrayWrapper
        isolated={true}
        showPanle="left"
        showTagByDefaut={width < 1280 ? true : false}
        openTray={openTray}
        closeTray={() => setOpenTray(false)}
        panleTag={(hover) => (
          <TrayTag
            hover={hover}
            icon={<FontAwesomeIcon icon={faBooks} />}
            placeMent="left"
            handleTagClick={() => setOpenTray((pre) => !pre)}
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
