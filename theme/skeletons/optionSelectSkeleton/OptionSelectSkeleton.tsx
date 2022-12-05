import React from "react";
import SkeletonElement from "../SkeletonElement";

const OptionSelectSkeleton = () => {
  return (
    <div>
      {[1, 2, 3, 5, 6, 7, 8, 9].map((item) => {
        return (
          <div key={item}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SkeletonElement
                type="title"
                style={{ width: "100%", borderRadius: "25px" }}
              />
              <SkeletonElement
                type="title"
                style={{ width: "100%", borderRadius: "25px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SkeletonElement
                type="title"
                style={{ width: "100%", borderRadius: "25px" }}
              />
              <SkeletonElement
                type="title"
                style={{ width: "100%", borderRadius: "25px" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OptionSelectSkeleton;
