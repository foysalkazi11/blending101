import React, { useMemo, useState } from "react";
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
import PlanForm, {
  defaultPlan,
} from "../../../component/module/Planner/PlanForm.component";
import Icon from "../../../component/atoms/Icon/Icon.component";

import styles from "../../../styles/pages/planner.module.scss";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_PLAN } from "../../../graphql/Planner";
import { useAppSelector } from "../../../redux/hooks";
import { addDays, isBefore, isEqual, isPast } from "date-fns";

const MyPlan = () => {
  const router = useRouter();
  const [createPlan] = useMutation(CREATE_PLAN);
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const plans = useAppSelector((state) => state.planner.plans);
  const methods = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });

  const [showGroceryTray] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handlePlanSave = (data) => {
    if (!showForm) return setShowForm(true);
    createPlan({
      variables: {
        data: {
          memberId,
          ...data,
          planData: plans.map((plan, idx) => ({
            day: idx,
            recipes: plan.recipes.map((recipe) => recipe._id),
          })),
        },
      },
    }).then(() => {
      setShowForm(false);
    });
  };

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
                    onClick={methods.handleSubmit(handlePlanSave)}
                  >
                    <span>{showForm ? "Save" : "Save As"}</span>
                  </div>
                </div>
              </div>
              <div className={styles.plan}>
                {showForm ? <PlanForm methods={methods} /> : <PlanHeader />}
                <PlanList data={plans} />
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
