import React from "react";
import MyCollections from "../../../components/pages/collection/myCollections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";

const MyCollectionsPage = () => {
  return <MyCollections />;
};

MyCollectionsPage.meta = {
  title: "My Recipe Collections",
  icon: (
    <FontAwesomeIcon
      icon={faBookmark}
      color="#fe5d1f"
      fontSize={20}
      style={{ marginRight: "5px" }}
    />
  ),
};

export default MyCollectionsPage;
