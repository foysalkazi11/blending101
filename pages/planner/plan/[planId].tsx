import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  faBookmark,
  faCalendarWeek,
  faMessageDots,
  faShareNodes,
} from "@fortawesome/pro-light-svg-icons";
import { faCalendarDays } from "@fortawesome/pro-solid-svg-icons";

import RXPanel from "../../../component/templates/Panel/RXFacts/RXPanel.component";
import PlanDiscovery from "../../../component/module/Planner/PlanDiscovery.component";
import PlanList from "../../../component/module/Planner/Plan/index.component";

import AContainer from "../../../containers/A.container";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";

import Insights from "../../../component/module/Planner/Insights.component";
import Icon from "../../../component/atoms/Icon/Icon.component";
import { faSearch, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";

import styles from "../../../styles/pages/planner.module.scss";
import IconButton from "../../../component/atoms/Button/IconButton.component";
import WeekPicker from "../../../component/molecules/DatePicker/Week.component";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PLAN,
  GET_ALL_PLAN_COMMENTS,
  GET_PLAN,
  SHARE_PLAN,
} from "../../../graphql/Planner";
import PlanForm, {
  defaultPlan,
} from "../../../component/module/Planner/PlanForm.component";
import { useForm } from "react-hook-form";
import PlannerQueue from "../../../component/module/Planner/Queue.component";
import ShareModal from "../../../component/organisms/Share/Share.component";
import CollectionDrawer from "../../../component/templates/Drawer/Collection/Collection.component";
import CommentDrawer from "../../../component/templates/Drawer/Comment/Comment.component";
import { useAppSelector } from "../../../redux/hooks";
import Publish from "../../../helpers/Publish";
import { useDispatch } from "react-redux";
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";

const MyPlan = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });

  const { data } = useQuery(GET_PLAN, {
    variables: { planId: router.query.planId },
    skip: router.query.planId === "",
  });
  const { data: comments } = useQuery(GET_ALL_PLAN_COMMENTS, {
    variables: { id: router.query.planId },
    skip: router.query.planId === "",
  });

  const [createPlan, createState] = useMutation(CREATE_PLAN);
  const [sharePlan, { data: share }] = useMutation(SHARE_PLAN);
  const [link, setLink] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [planlist, setPlanlist] = useState([]);
  const [week, setWeek] = useState({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const weekChangeHandler = (start, end) => {
    router.push(
      `/planner/plan/?plan=${router.query.planId}&start=${format(
        new Date(start),
        "yyyy-MM-dd",
      )}&end=${format(new Date(end), "yyyy-MM-dd")}`,
    );
  };

  const plan = data?.getAPlan?.plan;

  useEffect(() => {
    if (data?.getAPlan) {
      setPlanlist(data?.getAPlan?.plan?.planData || []);
    }
  }, [data?.getAPlan]);

  const allPlannedRecipes = useMemo(
    () =>
      plan?.planData
        .reduce((acc, cur) => acc.concat(cur.recipes), [])
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id),
        ),
    [plan],
  );

  const modifyPlan = (day, recipe) => {
    if (!day) return;
    setPlanlist((list) =>
      list.map((plan, idx) => {
        if (+day === idx + 1) {
          const isDuplicateRecipe = plan.recipes.some(
            (item) => item?._id === recipe?._id,
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

  const editHandler = async (data) => {
    if (!isEditMode) return setIsEditMode(true);
    const planData = {
      memberId: plan?.memberId,
      ...data,
      planData: planlist.map((plan) => ({
        day: plan.day,
        recipes: plan.recipes.map((recipe) => recipe._id),
      })),
    };
    await Publish({
      mutate: createPlan,
      state: createState,
      variables: { data: planData },
      success: "Created a new version of the Plan",
      onSuccess: () => {
        setIsEditMode(false);
      },
    });
    if (plan?.memberId === userId) {
    } else {
    }
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
    dispatch(
      updateHeadTagInfo({
        title: "Meal plan details",
        description: "meal plans details",
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AContainer
      headerIcon="/icons/calender__sidebar.svg"
      headerTitle="MEAL PLAN DETAILS"
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <CommentDrawer
        id={plan?._id}
        title={plan?.planName}
        comments={comments?.getAllCommentsForAPlan}
        show={showComments}
        onClose={() => setShowComments(false)}
      />
      <CollectionDrawer />
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
              {isEditMode ? (
                <PlannerQueue panel="plan" modifyPlan={modifyPlan} />
              ) : (
                <PlanDiscovery isUpload={false} recipes={allPlannedRecipes} />
              )}
            </div>
            <div className="col-6" style={{ padding: "0 1.5rem" }}>
              <div className={styles.headingDiv}>
                <IconHeading title="My Plan" icon={faCalendarDays} />
                <div className="flex ai-center">
                  <div
                    className={`${styles.uploadDiv} ${styles.uploadDiv__save}`}
                    onClick={methods.handleSubmit(editHandler)}
                  >
                    <span>{isEditMode ? "Save" : "Edit"}</span>
                  </div>
                  <IconButton
                    fontName={faTimes}
                    size="small"
                    variant="secondary"
                    className="ml-10"
                    onClick={() => router.push("/planner/plan")}
                  />
                </div>
              </div>
              {isEditMode ? (
                <PlanForm methods={methods} />
              ) : (
                <div className={styles.preview}>
                  <h3 className={styles.preview__title}>{plan?.planName}</h3>
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
                        onWeekChange={weekChangeHandler}
                      />
                      <span>
                        <Icon
                          fontName={faBookmark}
                          size="2rem"
                          className="mr-10"
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
                      <span onClick={() => setShowComments((prev) => !prev)}>
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
              )}
              <div className={`${styles.plan} ${styles["plan--details"]}`}>
                <PlanList data={planlist} />
              </div>
            </div>
            <div className="col-3">
              <Insights
                categories={data?.getAPlan?.recipeCategoriesPercentage}
                ingredients={data?.getAPlan?.topIngredients}
              />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => (
  <span onClick={onClick} ref={ref}>
    <Icon fontName={faCalendarWeek} size="2rem" className="mr-10" />
    Planner
  </span>
));
DatePickerButton.displayName = "DatePickerButton";

export default MyPlan;
