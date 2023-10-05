import React from "react";
import numberToArray from "../../../helperFunc/array/numberToArray";
import SkeletonElement from "../SkeletonElement";
import styles from "./SkeletonBlendType.module.scss";

interface Props {
  amount?: number;
  style?: React.CSSProperties;
}

const SkeletonBlendType = ({ amount = 6, style = {} }: Props) => {
  return (
    <div
      className={`${styles.skeletonBlendType_wraper} y-scroll`}
      style={style}
    >
      <SkeletonElement type="title" />
      <div className={styles.category_wraper}>
        {numberToArray(amount).map((item) => (
          <SkeletonElement
            key={item}
            type="thumbnail"
            style={{ width: "100%", height: "65px", margin: "5px 0" }}
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonBlendType;
