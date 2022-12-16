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
import { format, endOfWeek, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { CREATE_PLAN, GET_PLANNER_BY_WEEK } from "../../../graphql/Planner";
import { MONTH } from "../../../data/Date";

import styles from "../../../styles/pages/planner.module.scss";

const MyPlan = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const fetchedFromUrl = useRef(false);
  const [showGroceryTray] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [week, setWeek] = useState({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const [getPlanByWeek, { data }] = useLazyQuery(GET_PLANNER_BY_WEEK);

  useEffect(() => {
    if (fetchedFromUrl.current || !router.query.start || !router.query.end)
      return;
    setWeek({
      start: new Date(router.query.start as string),
      end: new Date(router.query.end as string),
    });
  }, [router.query?.end, router.query?.start]);

  useEffect(() => {
    if (memberId === "") return;
    const defaultFetch =
      !fetchedFromUrl.current && router.query.start && router.query.end;
    getPlanByWeek({
      variables: {
        userId: memberId,
        startDate: !defaultFetch
          ? format(week.start, "yyyy-MM-dd")
          : router.query.start,
        endDate: !defaultFetch
          ? format(week.end, "yyyy-MM-dd")
          : router.query.end,
      },
    }).then((response) => {
      if (
        router.query?.plan &&
        !fetchedFromUrl.current &&
        response?.data?.getPlannerByDates?.planners.length > 0
      ) {
        // const doReplace = confirm(
        //   "There are already plans listed in this week. Click OK to replace. Otherwise these plan will be merged",
        // );
      }
      fetchedFromUrl.current = true;
    });
  }, [getPlanByWeek, memberId, router.query, week]);

  const [createPlan] = useMutation(CREATE_PLAN);

  const startMonth = MONTH[week.start.getMonth()];
  const endMonth = MONTH[week.end.getMonth()];

  const startDay = week.start.getDate();
  const endDay = week.end.getDate();

  const { plans } = useMemo(() => {
    if (!data?.getPlannerByDates) return { plans: [] };
    return {
      plans: data?.getPlannerByDates.planners.map((planner) => ({
        id: planner._id,
        date: planner.formatedDate,
        recipes: planner.recipes.map((recipe) => ({
          _id: recipe?._id,
          name: recipe?.name,
          category: recipe?.recipeBlendCategory?.name,
          rxScore: 786,
          calorie: 250,
          ingredients: recipe?.ingredients,
        })),
      })),
    };
  }, [data?.getPlannerByDates]);

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
              <PlannerQueue panel="my-plan" />
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
                <PlanList data={plans} />
              </div>
            </div>
            <div className="col-3">
              <Insights
                categories={data?.getPlannerByDates?.recipeCategoriesPercentage}
                ingredients={data?.getPlannerByDates.topIngredients}
              />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default MyPlan;
