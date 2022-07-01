import React from "react";
import AContainer from "../../containers/A.container";
import styles from "./wiki.module.scss";
import WikiLeft from "./WikiLeft/WikiLeft";

const WikiHome = () => {
  return (
    <AContainer>
      <div className={styles.main}>
        <div className={styles.left}>
          <WikiLeft />
        </div>
        <div className={styles.center}>center</div>
      </div>
    </AContainer>
  );
};

export default WikiHome;
