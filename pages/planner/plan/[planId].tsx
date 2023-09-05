import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  Fragment,
} from "react";
import {
  faBookmark,
  faCalendarWeek,
  faMessageDots,
  faShareNodes,
} from "@fortawesome/pro-light-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/pro-solid-svg-icons";
import RXPanel from "component/templates/Panel/RXFacts/RXPanel.component";
import PlanDiscovery from "component/module/Planner/PlanDiscovery.component";
import PlanList from "component/module/Planner/PlanByDay.component";
import IconHeading from "theme/iconHeading/iconHeading.component";
import Insights from "component/module/Planner/Insights.component";
import Icon from "component/atoms/Icon/Icon.component";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import styles from "styles/pages/planner.module.scss";
import IconButton from "component/atoms/Button/IconButton.component";
import WeekPicker from "component/molecules/Date/Week.component";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { useQuery } from "@apollo/client";
import { GET_ALL_PLAN_COMMENTS } from "@/plan/plan.graphql";
import PlanForm, {
  defaultPlan,
} from "component/module/Planner/PlanForm.component";
import { useForm } from "react-hook-form";
import PlannerQueue from "component/module/Planner/Queue.component";
import ShareModal from "component/organisms/Share/Share.component";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ShowLastModifiedCollection from "components/showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenPlanCollectionTray } from "redux/slices/Planner.slice";
import useToOpenPlanCollectionTray from "customHooks/plan/useToOpenPlanCollectionTray";
import useToAddPlanToCollection from "customHooks/plan/useToAddPlanToCollection";
import { useUser } from "context/AuthProvider";
import { useSharePlan } from "@/plan/hooks";
import {
  addRecipe,
  deleteRecipe,
  moveRecipe,
} from "@/plan/services/plan-details.service";

import useClonePlan from "@/plan/hooks/plan-details/useClonePlan";
import useEditPlan from "@/plan/hooks/plan-details/useEditPlan";
import usePlanDetails from "@/plan/hooks/plan-details/usePlanDetails";
import routes from "routes";

const PlanDetails = () => {
  const { id } = useUser();
  const router = useRouter();
  const planId = router.query.planId;

  const dispatch = useAppDispatch();
  const form = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });

  const { plan, insights, recipes } = usePlanDetails(planId);

  const [planlist, setPlanlist] = useState([]);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [week] = useState({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });
  const [panelHeight] = useState("1000px");

  useEffect(() => {
    if (plan) {
      setPlanlist(plan?.planData || []);
      form.reset({
        planName: plan?.planName,
        description: plan?.description,
      });
    }
  }, [form, plan]);

  const { lastModifiedPlanCollection } = useAppSelector(
    (state) => state?.planner,
  );

  const [link, getLink] = useSharePlan(planId);

  const { data: comments } = useQuery(GET_ALL_PLAN_COMMENTS, {
    variables: { id: planId },
    skip: planId === "",
  });

  const editPlan = useEditPlan(planlist);
  const clonePlan = useClonePlan(planlist);
  const openCollection = useToOpenPlanCollectionTray();
  const addToCollection = useToAddPlanToCollection();

  const saveHandler = async (data) => {
    if (!isEditMode) return setIsEditMode(true);
    if (plan?.memberId === id) {
      // IF THE CREATOR OF THE PLAN TRIES TO EDIT THE PLAN
      editPlan(planId, data);
    } else {
      // IF VISITOR TRIES TO EDIT THE PLAN
      clonePlan(data);
    }
    setIsEditMode(false);
    setPlanlist(plan?.planData);
    form.reset(defaultPlan);
  };

  // HANDLERS FOR MODIFYING PLAN
  const addRecipeToPlan = useCallback((day, recipe) => {
    if (!day) return;
    setPlanlist((list) => addRecipe(list, day, recipe));
  }, []);

  const moveRecipeFromPlan = useCallback((dropId, draggedItem) => {
    setPlanlist((plans) => moveRecipe(plans, dropId, draggedItem));
  }, []);

  const deleteRecipeFromPlan = useCallback((day, recipeId) => {
    setPlanlist((list) => deleteRecipe(list, day, recipeId));
  }, []);

  // REDIRECTING TO MY PLAN TO ADD THIS PLAN IN MY PLAN LIST
  const addToMyPlan = useCallback(
    (start, end) => {
      const startDate = format(new Date(start), "yyyy-MM-dd");
      const endDate = format(new Date(end), "yyyy-MM-dd");
      router.push(
        `${routes.plan.myPlan}/?plan=${planId}&start=${startDate}&end=${endDate}&alert=true`,
      );
    },
    [planId, router],
  );

  return (
    <Fragment>
      <RXPanel />
      <ShareModal
        name={plan?.planName}
        show={showShare}
        setShow={setShowShare}
        link={link}
        onShare={getLink}
      />
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className="row mt-20">
            <div className="col-3">
              {isEditMode ? (
                <PlannerQueue
                  panel="plan"
                  height={panelHeight}
                  recipes={recipes}
                  modifyPlan={addRecipeToPlan}
                />
              ) : (
                <PlanDiscovery
                  height={panelHeight}
                  recipes={recipes}
                  setOpenCollectionModal={setOpenCollectionModal}
                />
              )}
            </div>
            <div className="col-6" style={{ padding: "0 1.5rem" }}>
              <div className={styles.headingDiv}>
                <IconHeading
                  title={isEditMode ? "Edit Plan" : "Plan"}
                  icon={faCalendarWeek}
                />
                <div className="flex ai-center">
                  <div
                    className={`${styles.uploadDiv} ${styles.uploadDiv__save}`}
                    onClick={form.handleSubmit(saveHandler)}
                  >
                    <span>{isEditMode ? "Save" : "Edit"}</span>
                  </div>
                  <IconButton
                    fontName={faTimes}
                    size="small"
                    variant="secondary"
                    className="ml-10"
                    color="white"
                    onClick={() => {
                      if (isEditMode) {
                        setIsEditMode(false);
                        setPlanlist(plan?.planData);
                        // methods.reset(defaultPlan);
                      } else {
                        router.push("/planner");
                      }
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
                {isEditMode ? (
                  <PlanForm methods={form} />
                ) : (
                  <Fragment>
                    <div className={styles.preview}>
                      <h3 className={styles.preview__title}>
                        {plan?.planName}
                      </h3>
                      <div className={styles.preview__actions}>
                        <span>
                          <img
                            src="/logo_small.svg"
                            alt=""
                            height={30}
                            className="mr-10"
                          />
                          Blending 101
                        </span>
                        <div>
                          <WeekPicker
                            element={<DatePickerButton />}
                            week={week}
                            onWeekChange={addToMyPlan}
                          />
                          <span
                            onClick={() =>
                              plan?.planCollections?.length
                                ? openCollection(
                                    plan?._id,
                                    plan?.planCollections,
                                    "details",
                                  )
                                : addToCollection(
                                    plan?._id,
                                    id,
                                    setOpenCollectionModal,
                                    "details",
                                  )
                            }
                          >
                            <Icon
                              fontName={
                                plan?.planCollections?.length
                                  ? faBookmarkSolid
                                  : faBookmark
                              }
                              size="2rem"
                              className="mr-10"
                              variant="bold"
                              color={plan?.planCollections?.length && "#fe5d1f"}
                            />
                            Bookmark
                          </span>
                          <span onClick={() => setShowShare(true)}>
                            <Icon
                              fontName={faShareNodes}
                              size="2rem"
                              className="mr-10"
                            />
                            Share
                          </span>
                          <span
                            onClick={() => setShowComments((prev) => !prev)}
                          >
                            <Icon
                              fontName={faMessageDots}
                              size="2rem"
                              className="mr-10"
                            />
                            {comments?.getAllCommentsForAPlan?.length || 0}
                          </span>
                        </div>
                      </div>
                      <hr />
                      <p>{plan?.description}</p>
                    </div>
                    <div style={{ height: 10, backgroundColor: "#f8f8f8" }} />
                  </Fragment>
                )}

                <div className={`${styles.plan} ${styles["plan--details"]}`}>
                  <PlanList
                    data={planlist}
                    cart={false}
                    action={false}
                    onMoveRecipe={isEditMode && moveRecipeFromPlan}
                    onRemove={isEditMode && deleteRecipeFromPlan}
                  />
                </div>
              </div>
            </div>
            <div className="col-3">
              <Insights
                height={panelHeight}
                score={plan?.gigl?.rxScore}
                calories={plan?.calorie?.value}
                {...insights}
              />
            </div>
          </div>
        </div>
      </div>
      <ShowLastModifiedCollection
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedPlanCollection?.name}
        openCollectionPanel={() => {
          dispatch(setIsOpenPlanCollectionTray(true));
          setOpenCollectionModal(false);
        }}
      />
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
