import React, { useState } from "react";
import { faToolbox } from "@fortawesome/pro-light-svg-icons";

import RXPanel from "../../component/templates/Panel/RXFacts/RXPanel.component";
import PlannerQueue from "../../component/module/Planner/Queue.component";
import PlanList from "../../component/module/Planner/Plan/index.component";

import AContainer from "../../containers/A.container";
import IconHeading from "../../theme/iconHeading/iconHeading.component";

import styles from "../../styles/pages/planner.module.scss";
import Recomendations from "../../component/module/Planner/Recomendations.component";

const ChallengePage = () => {
  const [showGroceryTray] = useState(true);
  return (
    <AContainer
      showGroceryTray={{
        show: showGroceryTray,
        showPanle: "right",
        showTagByDeafult: showGroceryTray,
      }}
    >
      <RXPanel />
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className={styles.planner__pageTitle}>BLENDA COACH</div>
          <div className="row">
            <div className="col-3">
              <PlannerQueue isUpload={false} />
            </div>
            <div className="col-6">
              <div className={styles.headingDiv}>
                <IconHeading title="Plan" icon={faToolbox} />
              </div>
              <div className={styles.toolbox}>
                <PlanList />
              </div>
            </div>
            <div className="col-3">
              <Recomendations />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default ChallengePage;
