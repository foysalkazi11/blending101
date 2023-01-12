import React from "react";
import randomNum from "../randomNum";
import SkeletonElement from "../SkeletonElement";

const NutrationPanelSkeleton = () => {
  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "20px" }}>
        <SkeletonElement type="title" style={{ width: "75%" }} />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      {[...Array(5)].map((item, index) => (
        <div style={{ marginBottom: "20px" }} key={index}>
          <SkeletonElement type="title" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" style={{ width: `${randomNum()}%` }} />
        </div>
      ))}
    </div>
  );
};

export default NutrationPanelSkeleton;
