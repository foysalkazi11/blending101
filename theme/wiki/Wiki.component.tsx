import React from "react";
import styles from "./wiki.module.scss";
import WikiRightComponent from "./WikiRight/WikiRight.component";
import WikiCenterComponent from "./WikiCenter/WikiCenter.component";
import AContainer from "../../containers/A.container";

function WikiComponent() {
  return (
    <AContainer>
      <div className={styles.mainwiki}>
        <WikiCenterComponent />
        <WikiRightComponent />
      </div>
    </AContainer>
  );
}

export default WikiComponent;
