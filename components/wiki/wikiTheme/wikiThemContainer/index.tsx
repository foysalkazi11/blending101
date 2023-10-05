import React from "react";
import generateDummyArray from "../../../../helperFunc/array/generateDummyArray";
import WikiThemeCard from "../wikiThemeCard";
import styles from "./WikiThemeContainer.module.scss";

interface WikiThemeContainerProps {
  data?: any[];
  loading?: boolean;
  scrollAreaMaxHeight?: number;
}
const WikiThemeContainer = ({
  data = generateDummyArray(10, { title: "Apple", image: "/images/apple.png" }),
  loading = false,
  scrollAreaMaxHeight,
}: WikiThemeContainerProps) => {
  return (
    <div
      className={`${styles.wikiThemeContainer} y-scroll`}
      style={{ maxHeight: `${scrollAreaMaxHeight || 500}px` }}
    >
      {data?.map((item, index) => {
        return (
          <WikiThemeCard key={index} image={item?.image} title={item?.title} />
        );
      })}
    </div>
  );
};

export default WikiThemeContainer;
