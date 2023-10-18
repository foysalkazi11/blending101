import React from "react";
import SkeletonElement from "../SkeletonElement";

const SkeletonWikiTheme = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem" }}>
      <SkeletonElement type="thumbnail" style={{ width: "100%", height: "150px" }} />
      <SkeletonElement type="thumbnail" style={{ width: "100%", height: "150px" }} />
      <SkeletonElement type="thumbnail" style={{ width: "100%", height: "150px" }} />
      <SkeletonElement type="thumbnail" style={{ width: "100%", height: "150px" }} />
      <SkeletonElement type="thumbnail" style={{ width: "100%", height: "150px" }} />
      <SkeletonElement type="thumbnail" style={{ width: "100%", height: "150px" }} />
    </div>
  );
};

export default SkeletonWikiTheme;
