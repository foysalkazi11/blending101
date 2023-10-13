import React, { useState } from "react";
import TrayWrapper from "../TrayWrapper";
import TrayTag from "../TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import ToggleMenu from "theme/toggleMenu/ToggleMenu";
import { faRectangleHistory } from "@fortawesome/pro-light-svg-icons";
import IconForAddComment from "../common/iconForAddComment/IconForAddComment";
import SingleCollectionForExtension from "../common/singleCollection/SingleCollectionForExtention";

const ExtensionCollectionTray = () => {
  const [isOpenCollectionTray, setIsOpenCollectionTray] = useState(true);
  return (
    <TrayWrapper
      showTagByDefault={true}
      closeTray={() => setIsOpenCollectionTray(!isOpenCollectionTray)}
      openTray={isOpenCollectionTray}
      showPanel={"right"}
      panelTag={(hover) => <TrayTag icon={<FontAwesomeIcon icon={faBookmark} />} placeMent="right" hover={hover} />}
    >
      <ToggleMenu
        toggleMenuList={[
          <div key={"key0"} className="flex ai-center">
            <FontAwesomeIcon icon={faRectangleHistory} style={{ marginRight: "5px" }} />
            <p>Collections</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />
      <IconForAddComment handleIconClick={() => {}} label="Add collection" />
      <SingleCollectionForExtension
        changeItemWithinCollection={true}
        handleClickCheckBox={(e) => console.log(e.target)}
        isItemWithinCollection={true}
        name="All Recipes"
        image="/cards/food.png"
      />
      <SingleCollectionForExtension changeItemWithinCollection={true} name="My New Collections" />
      <SingleCollectionForExtension name="Cool Collections" collectionItemLength={5} />
    </TrayWrapper>
  );
};

export default ExtensionCollectionTray;
