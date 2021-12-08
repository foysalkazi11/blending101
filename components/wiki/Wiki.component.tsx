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
        <WikiRightComponent
          ingredient={[
            { name: "Ginger", percent: 109 },
            { name: "Turmeric", percent: 95 },
            { name: "Chia Seeds", percent: 90 },
            { name: "Broth", percent: 80 },
            { name: "Sweet Potatoes", percent: 75 },
            { name: "Winter Squash", percent: 60 },
            { name: "Mint", percent: 55 },
            { name: "Pineapple", percent: 40 },
            { name: "Coconut Oil", percent: 35 },
          ]}
          nutrition={[
            { name: "Vitamin A", percent: 100 },
            { name: "Vitexin", percent: 90 },
            { name: "Vitamin D", percent: 87 },
            { name: "Iron", percent: 69 },
            { name: "Betaxanthins", percent: 50 },
            { name: "Calcium", percent: 35 },
            { name: "Quercetiin", percent: 20 },
          ]}
        />
      </div>
    </AContainer>
  );
}

export default WikiComponent;
