import React from "react";
import SkeletonElement from "../SkeletonElement";

const NutrationPanelSkeleton = () => {
  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "20px" }}>
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
    </div>
  );
};

export default NutrationPanelSkeleton;
