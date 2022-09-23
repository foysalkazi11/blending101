import React from "react";
import styles from "./GridWidget.module.scss";

const GridWidget = ({ data }) => {
  return (
    <div className={styles.theme}>
      {data &&
        data?.map((item, i) => (
          <div className={styles.theme__child} key={"theme__child" + i}>
            <div className={styles.theme__cover}>
              <div
                className={styles.theme__cover__abs}
                style={{ backgroundImage: `url(${item.icon})` }}
              />
            </div>
            <p>{item.displayName}</p>
          </div>
        ))}
    </div>
  );
};

export default GridWidget;
