import React from "react";
import Image from "next/image";
import styles from "./right_header.module.scss";
const RightHeader = () => {
  return (
    <div className={styles.recipeHeadingTopSec}>
      <h3>
        <div className={styles.chartbarIconDiv}>
          <Image
            src={"/icons/chart-bar-light-green.svg"}
            alt="Picture will load soon"
            height={"100%"}
            width={"100%"}
            // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
            layout="responsive"
            objectFit="contain"
          />
        </div>
        Rx Facts
      </h3>
    </div>
  );
};

export default RightHeader;
