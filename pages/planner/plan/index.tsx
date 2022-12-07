import React, { useState } from "react";
import { faToolbox } from "@fortawesome/pro-light-svg-icons";
import { faSearch } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";

import RXPanel from "../../../component/templates/Panel/RXFacts/RXPanel.component";
import PlannerQueue from "../../../component/module/Planner/Queue.component";
import PlanList from "../../../component/module/Planner/Plan/index.component";
import AContainer from "../../../containers/A.container";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";
import Insights from "../../../component/module/Planner/Insights.component";
import PlanHeader from "../../../component/module/Planner/Header.component";
import PlanForm from "../../../component/module/Planner/PlanForm.component";
import Icon from "../../../component/atoms/Icon/Icon.component";

import styles from "../../../styles/pages/planner.module.scss";

const MyPlan = () => {
  const [showGroceryTray] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  return (
    <AContainer
      headerTitle="MEAL PLAN"
      showGroceryTray={{
        show: showGroceryTray,
        showPanle: "right",
        showTagByDeafult: showGroceryTray,
      }}
    >
      <RXPanel />
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className="row ai-center">
            <div className="col-4">
              <div className={styles.planner__pageTitle}>BLENDA COACH</div>
            </div>
            <div className="col-4 ta-center ">
              <button
                className={styles.discoveryBtn}
                onClick={() => {
                  router.push("/planner");
                }}
              >
                <Icon fontName={faSearch} size="2rem" className="mr-10" />
                Plan Discovery
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <PlannerQueue isUpload={false} />
            </div>
            <div className="col-6" style={{ padding: "0 3.5rem" }}>
              <div className={styles.headingDiv}>
                <IconHeading title="My Plan" icon={faToolbox} />
                <div className="flex ai-center">
                  <div
                    className={`${styles.uploadDiv} ${styles.uploadDiv__save}`}
                    onClick={() => setShowForm((prev) => !prev)}
                  >
                    <span>{showForm ? "Save" : "Save As"}</span>
                  </div>
                </div>
              </div>
              {showForm && <PlanForm />}
              <div className={styles.plan}>
                {/* <PlannerHeader /> */}
                <PlanHeader />
                <PlanList />
              </div>
            </div>
            <div className="col-3">
              <Insights />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default MyPlan;
