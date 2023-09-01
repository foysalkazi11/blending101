import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  Fragment,
} from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { faCalendarWeek } from "@fortawesome/pro-light-svg-icons";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import { useForm } from "react-hook-form";

import RXPanel from "../../../component/templates/Panel/RXFacts/RXPanel.component";
import Center from "../../../component/module/Planner/AddPlan/PlanList.component";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";
import Insights from "../../../component/module/Planner/Insights.component";
import Icon from "../../../component/atoms/Icon/Icon.component";
import styles from "../../../styles/pages/planner.module.scss";
import IconButton from "../../../component/atoms/Button/IconButton.component";
import {
  CREATE_PLAN,
  GET_ALL_PLANS,
  GET_FEATURED_PLANS,
  GET_PLAN,
  SHARE_PLAN,
} from "../../../graphql/Planner";

import PlanForm, {
  defaultPlan,
} from "../../../component/module/Planner/PlanForm.component";
import LeftSection from "../../../component/module/Planner/AddPlan/RecipePanel.component";
import ShareModal from "../../../component/organisms/Share/Share.component";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import { updateSidebarActiveMenuName } from "../../../redux/slices/utilitySlice";
import { useUser } from "../../../context/AuthProvider";
import { Plan } from "../../../modules/plan/plan.types";
import { getPlanImage } from "../../../helpers/Plan";
import { ProfileRecipe } from "../../../modules/recipe/recipe.types";

const DEFAULT_PLAN: Plan[] = [
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
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });
  const { lastModifiedPlanCollection } = useAppSelector(
    (state) => state?.planner,
  );

  const memberId = useUser().id;
  const { data } = useQuery(GET_PLAN, {
    variables: { planId: router.query.planId, token: "", memberId },
    skip: router.query.planId === "",
  });

  const [createPlan, createState] = useMutation(CREATE_PLAN, {
    refetchQueries: [GET_FEATURED_PLANS, GET_ALL_PLANS],
  });
  const [sharePlan, { data: share }] = useMutation(SHARE_PLAN);

  const [panelHeight] = useState("1000px");
  const [link, setLink] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [planlist, setPlanlist] = useState<Plan[]>(DEFAULT_PLAN);

  const userId = useUser().id;

  const plan = useMemo(() => data?.getAPlan?.plan, [data]);

  useEffect(() => {
    if (plan) {
      setPlanlist(plan?.planData || []);
      methods.reset({
        planName: plan?.planName,
        description: plan?.description,
      });
    }
  }, [plan, methods]);

  const savePlan = async (data) => {
    const planData = [];
    const recipeImages: string[] = [];
    planlist.forEach((plan) => {
      const recipeIds = [];
      plan.recipes?.forEach((recipe) => {
        const images = recipe.recipeId?.image;
        images?.length > 0 && recipeIds.push(recipe?.recipeId?._id);
        recipeImages.push(images[0]?.image);
      });
      planData.push({ day: plan.day, recipes: recipeIds });
    });

    const image = await getPlanImage(recipeImages);
    await createPlan({
      variables: {
        data: {
          memberId: memberId,
          ...data,
          planData,
          image,
        },
      },
    });
    router.push("/planner");
  };

  const addRecipeToPlan = (day, recipe: ProfileRecipe) => {
    if (!day) return;

    setPlanlist((list) =>
      list.map((plan) => {
        if (+day === plan.day) {
          const isDuplicateRecipe = plan.recipes.some(
            (item) => item?.recipeId._id === recipe?.recipeId._id,
          );
          if (isDuplicateRecipe) return plan;
          else {
            return {
              ...plan,
              recipes: [...plan.recipes, recipe],
            };
          }
        } else {
          return plan;
        }
      }),
    );
  };

  const deleteRecipeFromPlan = (day, recipeId) => {
    setPlanlist((list) =>
      list.map((plan) => {
        if (+day === plan?.day) {
          return {
            ...plan,
            recipes: plan?.recipes.filter(
              (recipe) => recipe?.recipeId?._id !== recipeId,
            ),
          };
        } else {
          return plan;
        }
      }),
    );
  };

  const shareHandler = useCallback(async () => {
    sharePlan({
      variables: {
        userId,
        planId: router.query.planId,
      },
    });
  }, [router.query.planId, sharePlan, userId]);

  useEffect(() => {
    if (!share?.sharePlan) return;
    setLink(
      `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/planner/plan/shared/?token=${share?.sharePlan}`,
    );
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/planner/plan/shared/?token=${share?.sharePlan}`,
    );
  }, [share]);

  useEffect(() => {
    dispatch(updateSidebarActiveMenuName("Plans"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <RXPanel />
      <ShareModal
        name={plan?.planName}
        show={showShare}
        setShow={setShowShare}
        link={link}
        onShare={shareHandler}
      />
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className="row mt-20">
            <div className="col-3">
              <LeftSection
                height={panelHeight}
                addRecipeToPlan={addRecipeToPlan}
              />
            </div>
            <div className="col-6" style={{ padding: "0 1.5rem" }}>
              <div className={styles.headingDiv}>
                <IconHeading title={"Add Plan"} icon={faCalendarWeek} />
                <div className="flex ai-center">
                  <div
                    className={`${styles.uploadDiv} ${styles.uploadDiv__save}`}
                    onClick={methods.handleSubmit(savePlan)}
                  >
                    <span>Save</span>
                  </div>
                  <IconButton
                    fontName={faTimes}
                    size="small"
                    variant="secondary"
                    className="ml-10"
                    onClick={() => {}}
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
                  <Center data={planlist} onRemove={deleteRecipeFromPlan} />
                </div>
              </div>
            </div>
            <div className="col-3">
              <Insights
                height={panelHeight}
                categories={data?.getAPlan?.recipeCategoriesPercentage}
                ingredients={data?.getAPlan?.topIngredients}
                macros={data?.getAPlan?.macroMakeup}
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
