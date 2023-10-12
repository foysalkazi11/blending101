import { useLazyQuery } from "@apollo/client";
import { faBookmark } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bookmark from "component/templates/Drawer/Bookmark/Bookmark.component";
import TrayTag from "components/sidetray/TrayTag";
import CollectionComponent from "component/templates/Drawer/Bookmark/collection.component";
import GET_COLLECTIONS_AND_THEMES from "gqlLib/collection/query/getCollectionsAndThemes";
import React, { useState } from "react";

const Test = () => {
  const [open, setOpen] = useState(true);
  const [getCollectionsAndThemes, { data: collectionsData, loading: collectionsLoading, error: collectionsError }] =
    useLazyQuery(GET_COLLECTIONS_AND_THEMES, {
      // fetchPolicy: "cache-and-network",
    });

  const openHandler = () => {};
  const closeHandler = () => {};
  return (
    <div>
      <Bookmark
        showTagByDefault={open ? false : true}
        closeTray={closeHandler}
        openTray={open}
        showPanel={"left"}
        panelTag={(hover) => <TrayTag icon={<FontAwesomeIcon icon={faBookmark} />} placeMent="left" hover={hover} />}
      >
        <CollectionComponent
          collections={collectionsData?.getUserCollectionsAndThemes?.collections || []}
          collectionsLoading={collectionsLoading}
          handleDeleteCollection={() => {}}
          handleEditCollection={() => {}}
        />
      </Bookmark>
    </div>
  );
};

export default Test;
