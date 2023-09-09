import { faCalendarWeek } from "@fortawesome/pro-light-svg-icons";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import { Fragment, forwardRef, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import routes from "routes";

import IconButton from "component/atoms/Button/IconButton.component";
import Icon from "component/atoms/Icon/Icon.component";
import Insights from "@/plan/partials/Shared/Insights.component";
import PlanForm, { defaultPlan } from "@/plan/partials/Shared/PlanForm.component";
import RXPanel from "component/templates/Panel/RXFacts/RXPanel.component";
import IconHeading from "theme/iconHeading/iconHeading.component";

import Center from "@/plan/partials/AddPlan/PlanList.component";
import RecipePanel from "@/plan/partials/Shared/RecipePanel.component";

import { MyPlanItem } from "@/app/types/plan.types";

import { addRecipe, deleteRecipeFromPlan } from "@/plan/services/add-plan.service";

import useCreatePlan from "@/plan/hooks/add-plan/useCreatePlan";
import usePlanInsights from "@/plan/hooks/add-plan/usePlanInsights";

import styles from "@pages/planner.module.scss";
import DayPicker from "@/plan/partials/Shared/DayPicker.component";

const DEFAULT_PLAN: MyPlanItem[] = [
  { day: 1, recipes: [] },
  { day: 2, recipes: [] },
  { day: 3, recipes: [] },
  { day: 4, recipes: [] },
  { day: 5, recipes: [] },
  { day: 6, recipes: [] },
  { day: 7, recipes: [] },
];

const PlanDetails = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });

  const [panelHeight] = useState("1000px");
  const [planlist, setPlanlist] = useState<MyPlanItem[]>(DEFAULT_PLAN);

  const createPlan = useCreatePlan(planlist);
  const insights = usePlanInsights(planlist);

  // HANDLERS FOR MODIFYING PLAN
  const addRecipeToPlan = useCallback((day, recipe) => {
    if (!day) return;
    setPlanlist((list) => addRecipe(list, day, recipe));
  }, []);

  return (
    <Fragment>
      <RXPanel />
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className="row mt-20">
            <div className="col-3">
              <RecipePanel height={panelHeight} queuedRecipes={[]}>
                <DayPicker addRecipeToPlan={addRecipeToPlan} />
              </RecipePanel>
            </div>
            <div className="col-6" style={{ padding: "0 1.5rem" }}>
              <div className={styles.headingDiv}>
                <IconHeading title={"Add Plan"} icon={faCalendarWeek} />
                <div className="flex ai-center">
                  <div
                    className={`${styles.uploadDiv} ${styles.uploadDiv__save}`}
                    onClick={methods.handleSubmit(createPlan)}
                  >
                    <span>Save</span>
                  </div>
                  <IconButton
                    fontName={faTimes}
                    size="small"
                    variant="secondary"
                    className="ml-10"
                    color="white"
                    onClick={() => {
                      router.push(routes.plan.discovery);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  height: panelHeight,
                  background: "#fff",
                  borderRadius: 9,
                }}
              >
                <PlanForm methods={methods} />

                <div className={`${styles.plan} ${styles["plan--details"]}`}>
                  <Center
                    data={planlist}
                    onRemove={(day, recipeId) => deleteRecipeFromPlan(setPlanlist, day, recipeId)}
                  />
                </div>
              </div>
            </div>
            <div className="col-3">
              <Insights
                height={panelHeight}
                categories={insights?.recipeCategoriesPercentage}
                ingredients={insights?.topIngredients}
                macros={insights?.macroMakeup}
                calories={insights?.calorie}
                score={insights?.rxScore}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => (
  <span onClick={onClick} ref={ref}>
    <Icon fontName={faCalendarWeek} size="2rem" className="mr-10" />
    Planner
  </span>
));
DatePickerButton.displayName = "DatePickerButton";

export default PlanDetails;

PlanDetails.meta = {
  title: "Meal Plan Details",
  icon: "/icons/calender__sidebar.svg",
};
