import React, { Fragment, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { faChevronLeft, faChevronRight, faEllipsisV, faCalendarWeek } from "@fortawesome/pro-light-svg-icons";
import { faCalendarDay, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { addWeeks, format, subWeeks } from "date-fns";

import IngredientPanel from "component/templates/Panel/Ingredients/IngredientPanel.component";
import RXPanel from "component/templates/Panel/RXFacts/RXPanel.component";
import PlanList from "@/plan/partials/MyPlan/PlanListByDate.component";

import IconHeading from "theme/iconHeading/iconHeading.component";
import Insights from "@/plan/partials/Shared/Insights.component";
import PlanForm, { defaultPlan } from "@/plan/partials/Shared/PlanForm.component";
import IconButton from "component/atoms/Button/IconButton.component";

import RecipePanel from "@/plan/partials/Shared/RecipePanel.component";

import ConfirmAlert from "component/molecules/Alert/Confirm.component";
import DatePicker from "component/molecules/Date/DatePicker.component";
import Icon from "component/atoms/Icon/Icon.component";

import useAddRecipeToMyPlan from "@/plan/hooks/my-plan/useAddRecipe";
import useCreatePlan from "@/plan/hooks/add-plan/useCreatePlan";
import usePlanWeek from "@/plan/hooks/my-plan/usePlanWeek";
import usePlanByWeek from "@/plan/hooks/my-plan/usePlanByWeek";

import styles from "@pages/planner.module.scss";

import { UserRecipe } from "@/recipe/recipe.types";
import usePlanMerge from "@/plan/hooks/my-plan/usePlanMerge";
import Menubar from "component/molecules/Menubar/Menubar.component";
import { HideOnDesktop } from "component/molecules/Responsive/Responsive.component";
import { useMediaQuery } from "@/app/hooks/interface/useMediaQuery";

type IMenuType = "Recipe" | "My Plan" | "Plan Insights";
const MENU = ["Recipe", "My Plan", "Plan Insights"];

const MyPlan = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });

  const [panelHeight] = useState("1000px");
  const [showForm, setShowForm] = useState(false);
  const [active, setActive] = useState<IMenuType>("My Plan");

  const [week, setWeek] = usePlanWeek();

  const { addExistingPlan, duplicateState } = usePlanMerge();
  const [isDuplicate, setIsDuplicate] = duplicateState;

  const { plans, recipes, insights } = usePlanByWeek(week, addExistingPlan);

  const createPlan = useCreatePlan(plans);
  const addToMyPlan = useAddRecipeToMyPlan();

  const saveHandler = async (data) => {
    if (!showForm) return setShowForm(true);
    await createPlan(data);
  };

  const isMobile = useMediaQuery({ max: "768px" });
  const { monthStart, monthEnd, dayStart, dayEnd } = week;
  return (
    <Fragment>
      <RXPanel />
      <IngredientPanel />
      <ConfirmAlert
        show={isDuplicate}
        setShow={setIsDuplicate}
        onConfirm={addExistingPlan}
        message="There are already plans listed in this week."
      />
      <HideOnDesktop>
        <Menubar className="mt-20 mb-20 ml-10" items={MENU} onChange={(menu: IMenuType) => setActive(menu)} />
      </HideOnDesktop>
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className={isMobile ? "pl-20 pr-20" : "row mt-20"}>
            {active === "Recipe" && (
              <div className={isMobile ? "" : "col-3"}>
                <RecipePanel height={panelHeight} queuedRecipes={recipes}>
                  <RecipeDatePicker addToMyPlan={addToMyPlan} />
                </RecipePanel>
              </div>
            )}
            {active === "My Plan" && (
              <div className={isMobile ? "" : "col-6"} style={{ padding: "0 3.5rem" }}>
                <div className={styles.headingDiv}>
                  <IconHeading title="My Plan" icon={faCalendarWeek} />
                  <div className="flex ai-center">
                    <div
                      className={`${styles.uploadDiv} ${styles.uploadDiv__save}`}
                      onClick={methods.handleSubmit(saveHandler)}
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
                <div className={styles.plan} style={{ height: panelHeight, backgroundColor: "#fff" }}>
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
                            {`${monthStart} ${dayStart} - ${monthEnd} ${dayEnd}`}
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
                        <IconButton size="medium" fontName={faEllipsisV} className={styles.header__menu} />
                      </div>
                    </div>
                  )}
                  <PlanList plan={plans} week={week} />
                </div>
              </div>
            )}
            {active === "Plan Insights" && (
              <div className={isMobile ? "" : "col-3"}>
                <Insights height={panelHeight} {...insights} />
              </div>
            )}
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

interface DayPickerProps {
  _id?: string;
  recipe?: UserRecipe;
  addToMyPlan: any;
}
const RecipeDatePicker = (props: DayPickerProps) => {
  const { _id, addToMyPlan } = props;
  return (
    <DatePicker
      onChange={(date) => {
        const day = format(new Date(date), "yyyy-MM-dd");
        addToMyPlan(_id, day);
      }}
    >
      <Icon fontName={faCalendarDay} style={{ color: "#fe5d1f" }} size="20px" />
    </DatePicker>
  );
};
