import React from "react";
import SkeletonElement from "../SkeletonElement";

const SkeletonNote = () => {
  return (
    <div>
      <div style={{ margin: "30px 0" }}>
        <SkeletonElement type="title" style={{ margin: "10px 0" }} />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <div style={{ margin: "30px 0" }}>
        <SkeletonElement type="title" style={{ margin: "10px 0" }} />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <div style={{ margin: "30px 0" }}>
        <SkeletonElement type="title" style={{ margin: "10px 0" }} />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
    </div>
  );
};

export default SkeletonNote;
