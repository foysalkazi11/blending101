import React from "react";
import VersionCompare from "../../../components/pages/versionCompare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleVerticalHistory } from "@fortawesome/pro-light-svg-icons";

const VersionCompareRoot = () => {
  return <VersionCompare />;
};
VersionCompareRoot.meta = {
  title: "Recipe Version Compare",
  icon: (
    <FontAwesomeIcon
      icon={faRectangleVerticalHistory}
      color="#7cbc39"
      fontSize={20}
    />
  ),
};

export default VersionCompareRoot;
