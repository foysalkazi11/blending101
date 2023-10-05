import React from "react";
import TrayWrapper from "../TrayWrapper";
import TrayTag from "../TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/pro-regular-svg-icons";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setIsOpenWikiFilterTray } from "redux/slices/wikiSlice";
import WikiTypes from "components/wiki/wikiTypes/WikiTypes";
import styles from "./WikiFilterTray.module.scss";
import ToggleMenu from "theme/toggleMenu/ToggleMenu";
import { faTags } from "@fortawesome/pro-regular-svg-icons";
import WikiFilterTagSection from "./wikiFilterTagSection";

type WikiFilterTrayProps = {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
};
const WikiFilterTray = ({ showPanle, showTagByDefaut }: WikiFilterTrayProps) => {
  const dispatch = useAppDispatch();
  const isOpenWikiFilterTray = useAppSelector((state) => state.wiki.isOpenWikiFilterTray);
  const toggleTray = () => {
    dispatch(setIsOpenWikiFilterTray(!isOpenWikiFilterTray));
  };
  return (
    <TrayWrapper
      closeTray={toggleTray}
      openTray={isOpenWikiFilterTray}
      showTagByDefault={showTagByDefaut}
      showPanel={showPanle}
      panelTag={(hover) => <TrayTag icon={<FontAwesomeIcon icon={faFilter} />} placeMent="left" hover={hover} />}
    >
      <div className={styles.wikiFilterTrayContainer}>
        <WikiTypes type={"Ingredient"} setType={() => {}} showHeader={false} />
        <ToggleMenu
          // setToggle={handleToggle}
          // toggle={activeFilterTag.activeSection === "visual" ? 0 : 1}
          toggleMenuList={[
            <div key={"key1"} className="flex ai-center">
              <FontAwesomeIcon icon={faTags} className={styles.tag} />
              <p>Tags</p>
            </div>,
          ]}
          variant={"outlineSecondary"}
        />
        <WikiFilterTagSection />
      </div>
    </TrayWrapper>
  );
};

export default WikiFilterTray;
