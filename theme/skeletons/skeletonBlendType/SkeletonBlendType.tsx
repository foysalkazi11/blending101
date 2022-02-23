import React from "react";
import SkeletonElement from "../SkeletonElement";
import styles from "./SkeletonBlendType.module.scss";

const SkeletonBlendType = () => {
  return (
    <div className={styles.skeletonBlendType_wraper}>
      <SkeletonElement type="title" />
      <div className={styles.category_wraper}>
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
      </div>
    </div>
  );
};

export default SkeletonBlendType;
