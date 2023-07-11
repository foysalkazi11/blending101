import React from "react";
import generateDummyArray from "../../../../helperFunc/array/generateDummyArray";
import WikiThemeCard from "../wikiThemeCard";
import styles from "./WikiThemeContainer.module.scss";

interface WikiThemeContainerProps {
  data?: any[];
  loading?: boolean;
}
const WikiThemeContainer = ({
  data = generateDummyArray(10, { title: "Apple", image: "/images/apple.png" }),
  loading = false,
}: WikiThemeContainerProps) => {
  return (
    <div className={styles.wikiThemeContainer}>
      {data?.map((item, index) => {
        return (
          <WikiThemeCard key={index} image={item?.image} title={item?.title} />
        );
      })}
    </div>
  );
};

export default WikiThemeContainer;
