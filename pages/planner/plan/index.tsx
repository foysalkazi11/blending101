import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  faChevronLeft,
  faChevronRight,
  faEllipsisV,
  faToolbox,
} from "@fortawesome/pro-light-svg-icons";
import { faSearch } from "@fortawesome/pro-regular-svg-icons";

import RXPanel from "../../../component/templates/Panel/RXFacts/RXPanel.component";
import PlannerQueue from "../../../component/module/Planner/Queue.component";
import PlanList from "../../../component/module/Planner/Plan/index.component";
import AContainer from "../../../containers/A.container";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";
import Insights from "../../../component/module/Planner/Insights.component";
import PlanForm, {
  defaultPlan,
} from "../../../component/module/Planner/PlanForm.component";
import Icon from "../../../component/atoms/Icon/Icon.component";
import IconButton from "../../../component/atoms/Button/IconButton.component";

import { useAppSelector } from "../../../redux/hooks";
import { addWeeks, subWeeks } from "date-fns";
import { ADD_TO_MY_PLAN, CREATE_PLAN } from "../../../graphql/Planner";
import { MONTH } from "../../../data/Date";

import styles from "../../../styles/pages/planner.module.scss";
import ConfirmAlert from "../../../component/molecules/Alert/Confirm.component";
import Publish from "../../../helpers/Publish";
import { usePlanByWeek, useWeek } from "../../../hooks/modules/Plan/useMyPlan";

const MyPlan = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [showGroceryTray] = useState(true);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { week, setWeek, isFetchingFromURL } = useWeek();
  const { plans, topIngredients, recipeTypes } = usePlanByWeek({
    week,
    isFetchingFromURL,
    setShowDuplicateAlert,
  });

  const [addToMyPlan, addToMyPlanState] = useMutation(ADD_TO_MY_PLAN, {
    refetchQueries: ["GetPlannerByWeek"],
  });
  const [createPlan] = useMutation(CREATE_PLAN);

  const startMonth = MONTH[week.start.getMonth()];
  const endMonth = MONTH[week.end.getMonth()];
  const startDay = week.start.getDate();
  const endDay = week.end.getDate();

  const handlePlanSave = (data) => {
    if (!showForm) return setShowForm(true);
    createPlan({
      variables: {
        data: {
          memberId,
          ...data,
          planData: plans.map((plan, idx) => ({
            day: idx + 1,
            recipes: plan.recipes.map((recipe) => recipe._id),
          })),
        },
      },
    }).then(() => {
      setShowForm(false);
    });
  };

  const handleMergeOrReplace = async (type: "MERGE" | "REPLACE") => {
    await Publish({
      mutate: addToMyPlan,
      state: addToMyPlanState,
      variables: {
        type,
        planId: router.query?.plan,
        memberId,
        startDate: router.query?.start,
        endDate: router.query?.end,
      },
      success: "Added to My Plan successfully",
      onSuccess: () => {
        setShowDuplicateAlert(false);
      },
    });
  };

  return (
    <AContainer
      headerIcon="/icons/calender__sidebar.svg"
      headerTitle="MEAL PLAN"
      showGroceryTray={{
        show: showGroceryTray,
        showPanle: "right",
        showTagByDeafult: showGroceryTray,
      }}
      headTagInfo={{
        title: "Meal plan",
        description: "meal plan",
      }}
    >
      <RXPanel />
      <ConfirmAlert
        show={showDuplicateAlert}
        setShow={setShowDuplicateAlert}
        onConfirm={handleMergeOrReplace}
        message="There are already plans listed in this week."
      />
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
              <PlannerQueue
                panel="my-plan"
                week={week}
                isWeekFromURL={isFetchingFromURL}
              />
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
                {showForm ? (
                  <PlanForm methods={methods} />
                ) : (
                  <div className={styles.header}>
                    <div className={styles.header__wrapper}>
                      <div className={styles.textArrowTray}>
                        <IconButton
                          size="small"
                          fontName={faChevronLeft}
                          onClick={() => {
                            setWeek((week) => ({
                              start: subWeeks(week.start, 1),
                              end: subWeeks(week.end, 1),
                            }));
                          }}
                        />
                        <h4 className={styles.textArrowTray__text}>
                          Meal Plan,{" "}
                          {`${startMonth} ${startDay} - ${endMonth} ${endDay}`}
                        </h4>
                        <IconButton
                          size="small"
                          fontName={faChevronRight}
                          onClick={() => {
                            setWeek((week) => ({
                              start: addWeeks(week.start, 1),
                              end: addWeeks(week.end, 1),
                            }));
                          }}
                        />
                      </div>
                      <IconButton
                        size="medium"
                        fontName={faEllipsisV}
                        className={styles.header__menu}
                      />
                    </div>
                  </div>
                )}
                <PlanList
                  data={plans}
                  week={week}
                  isWeekFromURL={Boolean(
                    !isFetchingFromURL &&
                      router.query.start &&
                      router.query.end,
                  )}
                />
              </div>
            </div>
            <div className="col-3">
              <Insights categories={recipeTypes} ingredients={topIngredients} />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default MyPlan;
