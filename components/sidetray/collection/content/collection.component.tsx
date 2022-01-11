import React, { useState } from "react";
import styles from "./content.module.scss";

type CollectionComponentProps = {
  collections: {}[];
};

export default function CollectionComponent({
  collections,
}: CollectionComponentProps) {
  const data = [
    { title: "Desert Smoothies", img: "/cards/valentine.png" },
    { title: "Desert Smoothies", img: "/cards/children.png" },
    { title: "Desert Smoothies", img: "/cards/diabetes.png" },
    { title: "Desert Smoothies", img: "/cards/food.png" },
  ];

  return (
    <div className={styles.collection}>
      <div className={styles.collection__add}></div>
      <div className={styles.collection__collections}>
        {collections?.length &&
          collections?.map((item, i) => (
            <div
              className={styles.collection__child}
              key={"collections__child" + i}
            >
              <div className={styles.collection__child__img}>
                <div
                  className={styles.collection__child__img__abs}
                  style={{
                    backgroundImage: `url(${
                      //@ts-ignore
                      item.image || "/cards/food.png"
                    })`,
                  }}
                ></div>
              </div>
              <div className={styles.collection__child__name}>
                {/* @ts-ignore */}
                <p>{item.name}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
