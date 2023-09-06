import React, { Fragment, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  faChevronLeft,
  faChevronRight,
  faEllipsisV,
  faCalendarWeek,
} from "@fortawesome/pro-light-svg-icons";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";

import RXPanel from "component/templates/Panel/RXFacts/RXPanel.component";
import IngredientPanel from "component/templates/Panel/Ingredients/IngredientPanel.component";
import PlannerQueue from "component/module/Planner/Queue.component";
import PlanList from "modules/plan/partials/Plan/index.component";
import IconHeading from "theme/iconHeading/iconHeading.component";
import Insights from "component/module/Planner/Insights.component";
import PlanForm, {
  defaultPlan,
} from "component/module/Planner/PlanForm.component";
import IconButton from "component/atoms/Button/IconButton.component";

import { addWeeks, subWeeks } from "date-fns";
import { CREATE_PLAN } from "@/plan/plan.graphql";
import { MONTH } from "data/Date";

import styles from "@pages/planner.module.scss";
import ConfirmAlert from "component/molecules/Alert/Confirm.component";
import { usePlanByWeek, useWeek } from "hooks/modules/Plan/useMyPlan";
import { useUser } from "context/AuthProvider";
import { getPlanImage } from "helpers/Plan";

const MyPlan = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });

  const { id: memberId } = useUser();

  const [panelHeight] = useState("1000px");
  const [showForm, setShowForm] = useState(false);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);

  const { week, setWeek, isFetchingFromURL } = useWeek();
  const { plans, insights, onMergeOrReplace } = usePlanByWeek({
    week,
    isFetchingFromURL,
    setShowDuplicateAlert,
  });

  const [createPlan] = useMutation(CREATE_PLAN);

  const startMonth = MONTH[week.start.getMonth()];
  const endMonth = MONTH[week.end.getMonth()];
  const startDay = week.start.getDate();
  const endDay = week.end.getDate();

  const handlePlanSave = async (data) => {
    if (!showForm) return setShowForm(true);
    const planData = [];
    const images = [];
    plans.forEach((plan, index) => {
      const recipes = [];
      plan.recipes?.forEach((recipe) => {
        recipe.image?.length > 0 && images.push(recipe.image[0]?.image);
        recipes.push(recipe?._id);
      });
      planData.push({ day: index + 1, recipes });
    });
    const image = await getPlanImage(images);
    await createPlan({
      variables: {
        data: {
          memberId,
          ...data,
          planData,
          image,
        },
      },
    });
    setShowForm(false);
    router.push("/planner");
  };

  return (
    <Fragment>
      <RXPanel />
      <IngredientPanel />
      <ConfirmAlert
        show={showDuplicateAlert}
        setShow={setShowDuplicateAlert}
        onConfirm={onMergeOrReplace}
        message="There are already plans listed in this week."
      />
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className="row mt-20">
            <div className="col-3">
              <PlannerQueue
                panel="my-plan"
                week={week}
                isWeekFromURL={isFetchingFromURL}
                height={panelHeight}
              />
            </div>
            <div className="col-6" style={{ padding: "0 3.5rem" }}>
              <div className={styles.headingDiv}>
                <IconHeading title="My Plan" icon={faCalendarWeek} />
                <div className="flex ai-center">
                  <div
                    className={`${styles.uploadDiv} ${styles.uploadDiv__save}`}
                    onClick={methods.handleSubmit(handlePlanSave)}
                  >
                    <span>{showForm ? "Save" : "Save As"}</span>
                  </div>
                  <IconButton
                    fontName={faTimes}
                    size="small"
                    className="ml-10"
                    variant="secondary"
                    color="white"
                    onClick={() => {
                      if (showForm) {
                        setShowForm(false);
                      } else {
                        router.push("/planner");
                      }
                    }}
                  />
                </div>
              </div>
              <div
                className={styles.plan}
                style={{ height: panelHeight, backgroundColor: "#fff" }}
              >
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
                            router.replace("/planner/plan", undefined, {
                              shallow: true,
                            });
                            setWeek((week) => ({
                              start: subWeeks(week.start, 1),
                              end: subWeeks(week.end, 1),
                            }));
                          }}
                        />
                        <h4 className={styles.textArrowTray__text}>
                          {`${startMonth} ${startDay} - ${endMonth} ${endDay}`}
                        </h4>
                        <IconButton
                          size="small"
                          fontName={faChevronRight}
                          onClick={() => {
                            router.replace("/planner/plan", undefined, {
                              shallow: true,
                            });
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
              <Insights
                height={panelHeight}
                score={0}
                calories={0}
                {...insights}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyPlan;

MyPlan.meta = {
  title: "My Meal Plan",
  icon: "/icons/calender__sidebar.svg",
};
